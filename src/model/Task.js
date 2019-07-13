import { Model } from '@vuex-orm/core'

export default class Task extends Model {
  static entity = 'tasks'

  static fields () {
    return {
      id: this.attr(null),
      project_id :this.attr(null),
      name: this.string(''),
      start: this.string(''),
      end: this.string('')
    }
  }
}
