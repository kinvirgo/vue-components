import { InjectionKey, provide } from 'vue'

export function useChildren(key :InjectionKey<never> ) {



    const linkChildren = function (value) {
        provide(key, value)

    }

    return {
        linkChildren,
    }
}
