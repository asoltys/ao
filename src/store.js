import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

// state
import cash from './modules/cash'
import members from './modules/members'
import tasks from './modules/tasks'
import resources from './modules/resources'
import sessions from './modules/sessions'
import invoices from './modules/invoices'

// client side
import events from './modules/events'
import eventstream from './modules/eventstream'
import loader from './modules/loader'

console.log('b4 uex ')

Vue.use(Vuex)
console.log('after uex ')

console.log({cash})

export default new Vuex.Store({
  modules: {
      loader, members, tasks,
      resources, cash, events,
      eventstream, sessions,
      invoices
  },
  getters: {
      mrclean(state, getters){
          let time = 0, who = ''
          state.tasks.forEach(task => {
              if (task.lastClaimed > time){
                  who = task.lastClaimedby
              }
          })
          console.log('mrclean ', {who})
          return who
      },
      memberId(state, getters){
          let id
          state.sessions.forEach( s => {
              if (s.session === state.loader.session){
                  id = s.ownerId
              }
          })
          return id
      },
      isAdmin(state, getters){
          let isAdmin
          state.members.forEach(member => {
              if(getters.memberId === member.memberId){
                  member.badges.forEach( b => {
                      if (b === 'admin'){
                          isAdmin = true
                      }
                  })
              }
          })
          console.log('is admin asd', isAdmin)
          return isAdmin
      },
      isLoggedIn(state, getters){
          let isLoggedIn = !!getters.memberId
          return isLoggedIn
      },
      member(state, getters){
          let loggedInMember = {}
          state.members.forEach(member => {
              if( getters.memberId === member.memberId){
                  _.assign(loggedInMember, member)
              }
          })
          console.log({loggedInMember})
          return loggedInMember
      },
      name(state, getters){
          let name
          state.members.forEach(member => {
              if( getters.memberId === member.memberId){
                  name = member.name.slice()
              }
          })
          return name
      },
      address(state, getters){
          let address
          state.members.forEach(member => {
              if( getters.memberId === member.memberId){
                  address = member.address.slice() // TODO
              }
          })
          return address
      },
      balance(state, getters){
          let balance
          state.members.forEach(member => {
              if( getters.memberId === member.memberId){
                  balance = member.balance// TODO
              }
          })
          return balance
      }
  },
  middlewares: [],
  strict: process.env.NODE_ENV !== 'production'
})
