import { Model } from '@vuex-orm/core'
import Task from '../model/Task'

export default class Project extends Model {
  static entity = 'project'

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      tasks: this.hasMany(Task, 'project_id'),
      start: this.string(''),
      end: this.string('')
    }
  }
}
