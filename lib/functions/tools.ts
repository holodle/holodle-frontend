import { Fail, Success } from "@/lib/types/tools"


export function success<T>(data: T, message?: string): Success<T> {
    return { data, message, success: true }
}

export function fail(message?: string): Fail {
    return { message, success: false }
}

export function withinOneMonth(d1: string, d2: string): boolean {
    const day = (1000 * 60 * 60 * 24)
    const yyyy = 2000
    const d1MM = Number(d1.substring(0, 2)) - 1
    const d1DD = Number(d1.substring(2, 4))
    const d2MM = Number(d2.substring(0, 2)) - 1
    const d2DD = Number(d2.substring(2, 4))

    const c1 = Math.floor(Math.abs(new Date(yyyy, d1MM, d1DD) - new Date(yyyy, d2MM, d2DD)) / day) <= 31
    const c2 = Math.floor(Math.abs(new Date(yyyy + 1, d1MM, d1DD) - new Date(yyyy, d2MM, d2DD)) / day) <= 31
    const c3 = Math.floor(Math.abs(new Date(yyyy, d1MM, d1DD) - new Date(yyyy + 1, d2MM, d2DD)) / day) <= 31

    return [c1, c2, c3].some(a => a)
}
