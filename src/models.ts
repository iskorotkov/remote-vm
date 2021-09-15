export class Vm {
  constructor (
    public id: number,
    public name: string,
    public status: string,
    public cpus: number,
    public ram: number,
    public storage: number,
    public region: string,
    public os: string,
    public tags: string[],
    public ipv4?: string,
    public ipv6?: string
  ) {
  }
}
