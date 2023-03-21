import { Injectable } from "@angular/core"

@Injectable()
export class PersistanceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error saving to localStorage', e)
    }
  }

  get(key: string): any {
    try {
      const storage = localStorage.getItem(key)
      if (storage)
      return JSON.parse(storage)
    } catch (e) {
      console.error('Error getting away data from localStorage', e)
      return null
    }
  }
}
