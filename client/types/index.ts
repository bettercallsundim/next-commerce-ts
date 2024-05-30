export interface SignUp {
  email: string,
  name: string,
  picture: string
}

export type ToasterProps = {
  message: string,
  type : "success" | "error" | "info" | "warning"
}