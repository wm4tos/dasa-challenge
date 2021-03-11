export interface IUseCase<T, K = void | any> {
  execute(data: T): K;
}
