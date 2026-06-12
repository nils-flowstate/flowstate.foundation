// Minimaler Typ-Stub für Klaro! (liefert keine eigenen Typdefinitionen).
declare module 'klaro' {
  export const version: string

  export interface KlaroManager {
    consents: Record<string, boolean>
    watch(watcher: {
      update: (manager: KlaroManager, eventType: string, data?: unknown) => void
    }): void
  }

  export function getManager(config?: unknown): KlaroManager
  export function setup(config?: unknown): void
  export function show(config?: unknown, modal?: boolean): void
  export function render(config?: unknown, show?: boolean): void
}

declare module 'klaro/dist/klaro.css'
