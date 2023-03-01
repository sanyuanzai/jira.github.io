import { useState } from "react"

interface State<D>{
    error: null|Error
    data: D|null
    status: 'idle' | 'loadding' | 'error' | 'success'
}

const defaultInitialState:State<null> = {
    error:null,
    data: null,
    status:'idle'
}
const defaultConfig = {
    throwOnError:false
}
export const useAsync = <D>(initialState?:State<D>,initialConfig?:typeof defaultConfig) => {
    const config = {
        ...defaultConfig,
        ...initialConfig
    }
    const [state,setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const setData = (data:D) => setState({
        data,
        status:'success',
        error:null
    })
    const setError = (error:Error) => setState({
        data:null,
        status:'error',
        error
    })
    const [retry,setRetry] = useState(()=>()=>{})
    const run = (promise:Promise<D>,runConfig?:{retry:()=>Promise<D>})=>{
        if(!promise||!promise.then){
            throw new Error('请传入 Promise 类型数据')
        }
        setRetry(()=>()=>{
            if(runConfig?.retry){
                run(runConfig.retry(),runConfig)
            }
        })
        setState({...state,status:'loadding'})
        return promise.then(data=> {
            setData(data)
            return data
        }).catch(error=> {
            setError(error)
            if(config)return Promise.reject(error)
            return error})
    }
    
    return {
        isIdle: state.status === 'idle',
        isLoadding:state.status ==='loadding',
        isError: state.status === 'error',
        isSuccess:state.status === 'success',
        retry,
        run,
        setData,
        setError,
        ...state
    }
}