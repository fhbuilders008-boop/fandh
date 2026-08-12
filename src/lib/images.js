/**
 * Stock photography (Unsplash) — single source of truth.
 *
 * Every entry is an Unsplash photo id; `unsplash()` builds a CDN URL with the
 * transform params baked in, so the browser only ever downloads the width it
 * actually needs. Swapping in the client's own photography later means
 * replacing these constants with local paths and dropping the srcSet helper.
 */

const WIDTHS = [480, 768, 1080, 1600, 2000]

/** Build a single Unsplash CDN URL at a given width. */
export const unsplash = (id, w = 1080) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`

/** Responsive srcSet across the standard width ladder. */
export const unsplashSrcSet = (id) =>
  WIDTHS.map((w) => `${unsplash(id, w)} ${w}w`).join(', ')

export const IMAGES = {
  // ── Hero / brand ──────────────────────────────────────────────────────
  heroVilla: 'photo-1600585154340-be6161a56a0c', // lit contemporary villa at dusk
  aboutInterior: 'photo-1600607687939-ce8a6c25118c', // warm living pavilion
  ctaVilla: 'photo-1613490493576-7fde63acd811', // poolside villa elevation

  // ── Projects ──────────────────────────────────────────────────────────
  // Real client photography — served from /public, not the Unsplash CDN.
  upcomingWork: '/projects/land.jpeg',

  // ── Gallery: villas ───────────────────────────────────────────────────
  villaPool: 'photo-1600596542815-ffad4c1539a9',
  villaEvening: 'photo-1600585154526-990dced4db0d',
  villaCourt: 'photo-1512917774080-9991f1c4c750',
  villaWhite: 'photo-1580587771525-78b9dba3b914',

  // ── Gallery: construction & geotechnical ──────────────────────────────
  slabCasting: 'photo-1541888946425-d81bb19240f5', // reinforcement grid, aerial
  structuralFrame: 'photo-1508450859948-4e04fabaa4ea',
  siteTeam: 'photo-1504307651254-35680f356dfd',
  siteWorker: 'photo-1621905251189-08b45d6a269e',
  renovation: 'photo-1517581177682-a085bb7ffb15',
  blueprints: 'photo-1503387762-592deb58ef4e',

  // ── Gallery: interiors ────────────────────────────────────────────────
  interiorDining: 'photo-1600607687920-4e2a09cf159d',
  interiorKitchen: 'photo-1600585152220-90363fe7e115',
  interiorBedroom: 'photo-1512918728675-ed5a9ecdebfd',
  interiorLiving: 'photo-1600210492486-724fe5c67fb0',
  interiorLounge: 'photo-1600566753086-00f18fb6b3ea',

  // ── Gallery: drone ────────────────────────────────────────────────────
  droneLayout: 'photo-1512699355324-f07e3106dae5',
  droneDeck: 'photo-1600573472550-8090b5e0745e',
  droneFacade: 'photo-1487958449943-2429e8be8625',
  poolVilla: 'photo-1564013799919-ab600027ffc6',
}
