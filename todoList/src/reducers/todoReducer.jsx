

export default function todoReducer(state, action){
    switch(action.type){
        case 'ADD_TODO': {
            return{
                ...state,
                todoList: [...state.todoList, {
                    content: action.content,
                    id : crypto.randomUUID(),
                    edit: false,
                    done: false,    
        
                }]
            }
       
        }
        case 'DELETE_TODO': {
            return {
                ...state,
                todoList: state.todoList.filter((todo) => todo.id !== action.id)
            }

        }
        case 'VALIDATE_TODO' :{
            return {
                ...state,
                todoList: state.todoList.map((todo) => todo.id === action.id ? {...todo, done : !todo.done} : todo )
            }
        }
        case 'EDIT_TODO' : {
            return {
                ...state,
                todoList: state.todoList.map((todo) => todo.id === action.id ? {...todo, edit : !todo.edit} : todo )
            }
        }
        case 'SAVE_TODO' :{
            return {
                ...state,
                todoList: state.todoList.map((todo) => todo.id === action.id ? {...todo, content : action.content, edit: false} : todo )
            }
        }
        default : {
            throw new Error('action inconnu');
        }
    }
    
}