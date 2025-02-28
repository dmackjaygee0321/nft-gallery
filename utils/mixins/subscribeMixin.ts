import { Component, Vue } from 'nuxt-property-decorator'
import consola from 'consola'
// declare type UnsubscribePromise = Promise<Unsubscribe>;
declare type Unsubscribe = () => void

/*
 * refer to https://stackoverflow.com/questions/51873087/unable-to-use-mixins-in-vue-with-typescript
 * class ExtendedClass extends mixins(SubscribeMixin) {
 */
@Component
export default class SubscribeMixin extends Vue {
  private subs: Unsubscribe[] = []

  public async subscribe(fn: any, args: any[], callback: any) {
    fn(...args, callback)
      .then((sub: Unsubscribe) => this.subs.push(sub))
      .catch(consola.error)
  }

  public beforeDestroy(): void {
    this.subs.forEach((sub) => sub())
  }
}
