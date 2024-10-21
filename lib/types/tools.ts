export type Nullable<T> = T | null

export type Result<T> = Success<T> | Fail

export type Success<T> = {
    data: T
    message?: string
    success: true
}

export type Fail = {
    message?: string
    success: false
}
