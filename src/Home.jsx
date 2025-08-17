import {
    Button,
    TextField,
    List,
    ListItem,
    Container, 
    IconButton, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

function Home() {
    const [todoInput, setTodoInput] = useState("");         // 추가할 텍스트
    const [todoList, setTodoList] = useState([              // TO DO 리스트
        {id : 1, text: "테스트", completed: false, createAt: "2024-05-03"},
        {id : 2, text: "테스트", completed: false, createAt: "2025-06-08"},
    ]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);      // 삭제 다이얼로그
    const [todoDeleteId, setTodoDeleteId] = useState(null);         // 삭제 다이얼로그 ID
    const [todoDeleteText, setTodoDeleteText] = useState("");       // 삭제 다이얼로그 텍스트

    const [todoUpdateId, setTodoUpdateId] = useState(null);         // 수정 다이얼로그 ID
    const [todoUpdateText, setTodoUpdateText] = useState("");       // 수정 다이얼로그 텍스트

    const addTodo = () => {             // 추가
        if(todoInput.trim() === "") {
            return;
        }

        const date = new Date();
        const createDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);   // KST

        const newTodo = {
            id : Date.now(),
            text: todoInput,
            createAt: createDate.toISOString().slice(0, 10),
            completed: false
        };

        setTodoList([...todoList, newTodo]);
        setTodoInput("");
    };

    const handleDeleteTodo = () => {            // 삭제
        const updatedTodoList = todoList.filter((todoList) => todoList.id !== todoDeleteId);
        setTodoList(updatedTodoList);
        handleDeleteConfirmClose();
    };

    const handleTodoToggle = (id) => {            // 할 일 완료
        const newTodo = todoList.map((todoList) => todoList.id === id? {
            ...todoList, completed: !todo.completed
        } : todoList);
        setTodoList(newTodo);
    };

    const handleDeleteConfirmOpen = (id, text) => {     // 다이얼로그 열기
        setTodoDeleteId(id);
        setTodoDeleteText(text);
        setDeleteConfirm(true);
    };

    const handleDeleteConfirmClose = () => {            // 다이얼로그 닫기
        setDeleteConfirm(false);
    };

    const handleUpdateTodo = (id, currentText) => {     // 수정
        setTodoUpdateId(id);
        setTodoUpdateText(currentText);
    };

    const handleUpdateSave = () => {                    // 수정 저장
        const updateList = todoList.map((todo) => 
            todo.id === todoUpdateId ? { ...todo, text: todoUpdateText } : todo
        );
        setTodoList(updateList);
        setTodoUpdateId(null);
        setTodoUpdateText("");
    };

    const handleUpdateCancel = () => {                  // 수정 취소
        setTodoUpdateId(null);
        setTodoUpdateText("");
    };

    const handleUpdateKey = (e) => {                    // 수정 키
        if(e.key === "Enter") {
            handleUpdateSave();
        } else if(e.key === "Escape") {
            handleUpdateCancel();
        }
    };

    return(
        <div>
            <div 
                style={{
                    background: "#79bfdb",
                    background: "linear-gradient(90deg,rgba(121, 191, 219, 1) 0%, rgba(76, 199, 127, 1) 50%, rgba(224, 210, 81, 1) 100%)"
            }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "3em",
                        padding: "20px",
                        color: "white",
                        textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                    }}>
                        TO DO
                    </div>
                <Container
                    maxWidth="lg"
                    style={{display: "flex",
                    alignItems: "center",
                    justifyContent:"center",
                    gap: 8,
                    height:"10vh"
                }}>
                    <TextField
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTodo()}
                        fullWidth
                        id="outlined-basic" 
                        label="할 일" 
                        variant="outlined" 
                        style={{width: "50vw",
                        background: "white"
                    }}/>
                    <Button
                        variant="contained"
                        onClick={addTodo}
                        style={{
                            borderRadius: "50px"
                        }}
                    >
                        추가
                    </Button>
                </Container>
            </div>
                <List>
                    {todoList.map((todoList) => (
                        <ListItem
                            style={{
                                background: "#f3f3f3",
                                borderBottom: "1px solid #d2d2d2",
                            }}
                            key={todoList.id}
                            secondaryAction={
                                <>
                                    <IconButton
                                        aria-label="edit"
                                        edge="end"
                                        onClick={() => handleUpdateTodo(todoList.id, todoList.text)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        edge="end"
                                        onClick={() => handleDeleteConfirmOpen(todoList.id, todoList.text)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            
                        }>

                        {todoUpdateId === todoList.id ? (
                            <TextField
                                fullWidth
                                autoFocus
                                value={todoUpdateText}
                                onChange={(e) => setTodoUpdateText(e.target.value)}
                                onKeyDown={handleUpdateKey}
                                onBlur={handleUpdateCancel}
                                size="small"
                            >

                            </TextField>
                        ) : (
                            <Button
                            variant="text"
                            size="large"
                            style={{
                            color: todoList.completed ? "gray" : "black",
                            justifyContent:"start",
                            width:"100%",
                            paddingLeft:"3vw",
                            textDecoration: todoList.completed ? "line-through" : "none",
                        }}
                            onClick={() => handleTodoToggle(todoList.id)}
                        >
                            {todoList.text}
                        </Button>
                        )}
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "10%",
                        }}>
                            {todoList.createAt}
                        </div>
                        </ListItem>
                    ))}
                </List>
                <Dialog
                    open={deleteConfirm}
                    onClose={handleDeleteConfirmClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    onExited={() => {           // 닫힌 후 텍스트 초기화
                        setTodoDeleteId(null);
                        setTodoDeleteText("");  
                    }}
                >
                <DialogTitle id="alert-dialog-title">
                        삭제하시겠습니까?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <b>{todoDeleteText}</b> 를(을) 삭제하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteTodo}>삭제</Button>
                    <Button onClick={handleDeleteConfirmClose} autoFocus>
                        취소
                    </Button>
                </DialogActions>
                </Dialog>
        </div>
    )
}

export default Home;