// Pure model of one 2U compute sled ("sled 07") in rack kr-01.
// Every number the figure shows (readout, LED rates, fan speed) comes from here,
// so the drawing, the motion and the words stay consistent.

// Air at datacenter inlet conditions.
export const AIR_DENSITY = 1.2; // kg/m³
export const AIR_CP = 1005; // J/(kg·K)

// The sled: two 205 W sockets, 16 DIMMs, 8 NVMe drives, a NIC, six fans.
export const SLED = {
  idleWatts: 165, // board, BMC, DIMMs and drives at rest
  peakWatts: 690, // all cores busy, memory and NIC loaded
  fans: 6,
  fanMinRpm: 4200,
  fanMaxRpm: 16800,
  fanMaxCfm: 26, // per fan at max speed (fan law: airflow ∝ rpm)
  targetDeltaT: 15, // the BMC fan curve aims to hold exhaust − inlet at 15 K
  capacityRps: 48000, // requests per second at 100 % load
};

export const INLET_C = 22; // ASHRAE recommended cold-aisle inlet
const CFM_TO_M3S = 0.000471947;

/** Synthetic but smooth workload in [0.12, 0.96]: a slow swell with two faster ripples. */
export function loadAt(seconds) {
  const t = seconds;
  const swell = 0.5 + 0.5 * Math.sin((t / 23) * Math.PI * 2 - 1.1);
  const ripple = 0.5 + 0.5 * Math.sin((t / 6.1) * Math.PI * 2) * Math.sin((t / 9.7) * Math.PI * 2 + 0.6);
  return 0.12 + 0.84 * (0.72 * swell + 0.28 * ripple);
}

/** Thermal and traffic state of the sled at a given load (0…1). */
export function stateAt(load) {
  const u = Math.min(1, Math.max(0, load));
  const watts = SLED.idleWatts + u * (SLED.peakWatts - SLED.idleWatts);
  // Airflow the fan curve wants for the target ΔT: Q = P / (ρ · cp · ΔT).
  const wanted = watts / (AIR_DENSITY * AIR_CP * SLED.targetDeltaT);
  const maxFlow = SLED.fans * SLED.fanMaxCfm * CFM_TO_M3S;
  const rpm = Math.min(SLED.fanMaxRpm, Math.max(SLED.fanMinRpm, (wanted / maxFlow) * SLED.fanMaxRpm));
  const flow = (rpm / SLED.fanMaxRpm) * maxFlow; // fan law
  const deltaT = watts / (AIR_DENSITY * AIR_CP * flow);
  return {
    load: u,
    watts,
    rpm,
    flowM3s: flow,
    cfm: flow / CFM_TO_M3S,
    inlet: INLET_C,
    exhaust: INLET_C + deltaT,
    deltaT,
    rps: u * SLED.capacityRps,
  };
}

/** Port activity blink rate in Hz for a share of the traffic (LEDs on the switch and NICs). */
export function blinkHz(rps, share = 1) {
  return 0.6 + Math.min(9, (rps * share) / 4000);
}

const groupThousands = (value) => String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** The card readout, in Spanish, short enough for a 390 px phone. */
export function readoutOf(state, openShare) {
  const phase = openShare > 0.98 ? "abierto" : openShare < 0.02 ? "en rack" : openShare > 0.5 ? "saliendo" : "entrando";
  return `${phase} · carga ${Math.round(state.load * 100)}% · ${state.exhaust.toFixed(1)} °C · ${groupThousands(state.rpm)} rpm`;
}

/** A longer line for the legend: what the readout numbers mean right now. */
export function detailOf(state) {
  return `${(state.rps / 1000).toFixed(1)}k req/s · ${Math.round(state.watts)} W · entrada ${state.inlet.toFixed(1)} °C → salida ${state.exhaust.toFixed(1)} °C · ${Math.round(state.cfm)} CFM`;
}
