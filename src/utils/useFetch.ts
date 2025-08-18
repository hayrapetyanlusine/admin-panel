import { ref } from 'vue'

export function useFetch<T>(url: string) {
    const data = ref<T | null>(null);
    const error = ref<Error | null>(null);

    fetch(url)
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))

    return { data, error }
}