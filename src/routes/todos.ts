import {Router} from 'express';
import { type } from 'os';
import {Todo} from '../models/todo';

let todos:Todo[]=[];

type requestBody={text:string};
type requestparams={todoId:string};

const router =Router();

router.get('/',(req,res,next)=>{
 res.status(200).json({todos:todos});
});

router.post('/todo',(req,res,next)=>{
    const body=req.body as requestBody;
const newtodo:Todo={
id:new Date().toISOString(),
text:body.text
}

todos.push(newtodo);

res.status(201).json({message:"Added todo",todos:todos});
});

router.put('/todo/:todoId',(req,res,next)=>{
   const params=req.params as requestparams;
    const tid=params.todoId;
    const body=req.body as requestBody;
    const todoIndex=todos.findIndex((todoItem)=>todoItem.id===tid);
if(todoIndex>=0){
todos[todoIndex]={ id:todos[todoIndex].id,text:body.text}
 return res.status(200).json({messge:"todo updated",todos})
}

res.status(404).json({message:"Could not find todo"});

});

router.delete('/todo/:todoId',(req,res,next)=>{
    const params=req.params as requestparams;
    todos=todos.filter((todoItem)=>todoItem.id!==params.todoId);
res.status(200).json({message:"Deleted todo",todos:todos});
});

export default router;