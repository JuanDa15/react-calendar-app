import { AxiosError } from "axios"
import { ServerResponse } from "../definitions"

export function castToAxiosError(error: unknown): AxiosError<ServerResponse, unknown> {
  return error as AxiosError<ServerResponse, unknown>
}