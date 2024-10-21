import { Fail, Success } from "@/lib/types/tools"


export function success<T>(data: T, message?: string): Success<T> {
    return { data, message, success: true }
}

export function fail(message?: string): Fail {
    return { message, success: false }
}
