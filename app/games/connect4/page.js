"use client"
import React, { useEffect, useRef } from "react";
//import 'game.js';


const style = {
    canvas :{
        display: 'flex' ,
        border: '3px solid black',
        marginTop: '5px',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    message :{
        fontSize: 'x-large',
        textAlign: 'center'
    },
    div :{
        textAlign: 'center'
    },
    button :{
        backgroundColor: 'blue',
        color: 'white',
        "&:hover" :{
            backgroundColor: 'red',
            color: 'white',
            cursor: 'pointer',
            transition: "0.5s ",
        }
    }
}

export default function Connect4(props){
    let c4 = useRef();
    
    useEffect(()=>{
        let settings = {
            width : props.width || 630,
            height : props.height || 540,
            columns: props.columns || 7,
            rows: props.rows || 6,
            connectNum: props.connectNum || 4,
        }
        const canvas = c4.current;
        canvas.width = settings.width
        canvas.height = settings.height;
        let context = canvas.getContext('2d');
        new Board(settings.rows,settings.columns,settings.width,settings.height,settings.connectNum,canvas,context);
    })
    

    return (
           <div style = {style.div}>
               <canvas ref={c4} style = {style.canvas}/>
               How to play:
                <br/>
                1. Click on the column to drop a piece.
                <br/>
                2. The first player to get 4 pieces in a row wins.
                <br/>
                3. If no player has 4 pieces in a row, the game ends in a tie.
                <br/>
                Press R to start a new game
           </div>
       )
}


//Game

class Board {
    bot = true
    turn = 0; 
    winner = 0;
    
    constructor(rows,columns,width,height, connectNum, canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.rows = rows;
        this.columns = columns;
        this.width = width;
        this.height = height;
        this.connectNum = connectNum;
        this.board = this.createBoard();
        this.drawBoard();

        this.mouse = {x: 0, y: 0};
        this.previewColumn = -1;
        this.mouseMove = document.addEventListener("mousemove", e => {
            if(this.winner != 0){return}
            this.mouse = this.getMousePos(canvas, e);
            // let temp = this.previewColumn;
            // this.previewColumn = parseInt(this.mouse.x / (this.width / this.columns));
            // if(temp != this.previewColumn ){
            //     this.drawBoard();
            //     this.previewNextMove();
            // }
            //this.drawBoard();
        });
        document.onclick = (event) => {
            if(this.mouse.x > 0 && this.mouse.x < this.width && this.mouse.y > 0 && this.mouse.y < this.height){
                this.makeMove(parseInt(this.mouse.x/parseInt(this.width / this.columns)))
        }}
        document.onkeydown = (event) => {
            if (parseInt(event.key)){
                this.makeMove(event.key-1)
            }
            if (event.key == "r"){
                this.reset();
            }
        }
    }

    ///////////////////////////////////////////////////////////////////////////////
    fill(r,g,b){
        this.context.fillStyle = 'rgb('+r+','+g+','+b+')'
    }
    fills(r,g,b,a){
        this.context.fillStyle = 'rgba('+r+','+g+','+b+','+a+')'
    }
    fillRect(x,y,w,h){
        this.context.fillRect(x,y,w,h)
    }
    fillText(text,x,y,size){
        this.context.font = size + "px Arial";
        this.context.fillText(text,x,y);
    }
    fillEllipse(x,y,w,h){
        this.context.beginPath();
        this.context.ellipse(x,y,w,h,0,0,Math.PI*2);
        this.context.fill();
    }
    getMousePos(canvas, evt) {
        let rect = this.canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }
    // getBestMove(board, player) {
    //     const opponent = player === 1 ? 2 : 1;
      
    //     function minimax(board, depth, isMaximizing) {
    //       const result = this.checkWinner(board);
    //       if (result !== null) {
    //         return result === player ? 10 - depth : depth - 10;
    //       }
    //       if (checkTie(board)) {
    //         return 0;
    //       }
      
    //       let bestScore = isMaximizing ? -Infinity : Infinity;
    //       let move = -1;
    //       for (let i = 0; i < 7; i++) {
    //         const newBoard = makeMove(board, i, isMaximizing ? player : opponent);
    //         if (newBoard) {
    //           const score = minimax(newBoard, depth + 1, !isMaximizing);
    //           if (isMaximizing && score > bestScore) {
    //             bestScore = score;
    //             move = i;
    //           } else if (!isMaximizing && score < bestScore) {
    //             bestScore = score;
    //           }
    //         }
    //       }
    //       return move === -1 ? bestScore : move;
    //     }
      
    //     return minimax(board, 0, true);
    //   }
    ///////////////////////////////////////////////////////////////////////////////
    createBoard(){
        let board = []
        for(let i = 0; i < this.rows; i++){
            board[i] = []
            for(let j = 0; j < this.columns; j++){
                board[i][j] = 0
            }
        }
        return board;
    }
    drawBoard(){
        this.fill(70,70,255);
        this.fillRect(0,0,this.width,this.height)

        let pieceWidth = parseInt(this.width / this.columns)
        let pieceHeight = parseInt(this.height / this.rows)
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                if(this.board[i][j] == 1){
                    this.fill(255,0,0)
                    this.fillEllipse(j*pieceWidth + pieceWidth/2,i*pieceHeight + pieceHeight/2,pieceWidth/2-2,pieceHeight/2-2)
                }
                else if(this.board[i][j] == 2){
                    this.fill(255,255,0)
                    this.fillEllipse(j*pieceWidth + pieceWidth/2,i*pieceHeight + pieceHeight/2,pieceWidth/2-2,pieceHeight/2-2)
                }
                else{
                    this.fill(255,255,255)
                    this.fillEllipse(j*pieceWidth + pieceWidth/2,i*pieceHeight + pieceHeight/2,pieceWidth/2-2,pieceHeight/2-2)
                }
                
            }
        }
    }
    previewNextMove(){
        if(!(this.mouse.x > 0 && this.mouse.x < this.width && this.mouse.y > 0 && this.mouse.y < this.height)){return}
        let pieceWidth = parseInt(this.width / this.columns)
        let pieceHeight = parseInt(this.height / this.rows)
        let column = parseInt(this.mouse.x / pieceWidth);
        if(this.board[0][column] != 0){return}
        let i = this.rows - 1;
        while(this.board[i][column] != 0 && i >= 0){
            i--;
        }
        if(i >= 0){
            !(this.turn % 2) ? this.context.fillStyle = 'rgb(255,0,0,0.3)' : this.context.fillStyle = 'rgb(255,255,0,0.3)'
            this.context.beginPath();
            this.context.ellipse(column*pieceWidth + pieceWidth/2,i*pieceHeight + pieceHeight/2,pieceWidth/2-2,pieceHeight/2-2,0,0,Math.PI*2);
            this.context.fill();
        }
    }

    makeMove(columnNum){
        if(this.winner != 0 || this.board[0][columnNum] != 0){ return;}
        let column = parseInt(columnNum)
        let i = this.rows - 1;
        while(this.board[i][column] != 0 && i >= 0){
            i--;
        }
        this.board[i][column] = (this.turn % 2) + 1
        this.drawBoard();
        if(this.checkWin(this.board)){
            this.winner = (this.turn % 2) + 1
            this.message();
        }
        if(this.checkTie(this.board)){
            this.winner = 3;
            this.message();
        }
        this.turn++;
        // if(this.bot && this.turn % 2 == 1){
        //     this.makeMove(this.getBestMove(this.board, 2))
        // }
    }
    checkTie(board){
        if(this.checkWin(board) == true){return false}
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                if(board[i][j] == 0){
                    return false;
                }
            }
        }
        return true;
    }
    // checkWinner(board){
    //     for(let i = 1; i <= 2; i++){
    //         if(this.checkHorizontal(i,board) || this.checkVertical(i,board) || this.checkDiagonal(i,board)){
    //             return i;
    //         }
    //     }
    //     return null;
    // }
    checkWin(board){
        for(let i = 1; i <= 2; i++){
            if(this.checkHorizontal(i,board) || this.checkVertical(i,board) || this.checkDiagonal(i,board)){
                return true;
            }
        }
        return false;
    }
    checkHorizontal(piece,board){
        let win = false;
        for(let i = 0; i < this.rows; i++){
            let count = 0;
            for(let j = 0; j < this.columns; j++){
                if(board[i][j] == piece){
                    count++;
                }
                else{
                    count = 0;
                }
                if(count == this.connectNum){
                    win = true;
                }
            }
        }
        return win;
    }
    checkVertical(piece,board){
        let win = false;
        for(let i = 0; i < this.columns; i++){
            let count = 0;
            for(let j = 0; j < this.rows; j++){
                if(board[j][i] == piece){
                    count++;
                }
                else{
                    count = 0;
                }
                if(count == this.connectNum){
                    win = true;
                }
            }
        }
        return win;
    }
    checkDiagonal(piece,board){
        let win = false;
        // top left to bottom right
        for(let i = 0; i < this.rows - this.connectNum + 1; i++){
            for(let j = 0; j < this.columns - this.connectNum + 1; j++){
                let count = 0;
                for(let k = 0; k < this.connectNum; k++){
                    if(board[i+k][j+k] == piece){
                        count++;
                    }
                    else{
                        count = 0;
                    }
                    if(count == this.connectNum){
                        win = true;
                    }
                }
            }
        }
        // top right to bottom left
        for(let i = 0; i < this.rows - this.connectNum + 1; i++){
            for(let j = this.columns - 1; j >= this.connectNum - 1; j--){
                let count = 0;
                for(let k = 0; k < this.connectNum; k++){
                    if(board[i+k][j-k] == piece){
                        count++;
                    }
                    else{
                        count = 0;
                    }
                    if(count == this.connectNum){
                        win = true;
                    }
                }
            }
        }
        return win;
    }
    message(){
        document.removeEventListener('mousemove',this.mouseMove)
        this.fills(0,0,0,.6);
        this.fillRect(0,0,this.width,this.height);
        //this.drawBoard();
        if(this.winner == 1 || this.winner == 2){
            this.fill(255,255,255)
            this.fillText(`Player ${this.winner} wins!`,0,50, 30)
            this.fillText(`Press r to Play again`,0,100, 30)
        }
        else if(this.winner == 3){
            this.fill(255,255,255)
            this.fillText(`Tie!`,0,50, 30)
            this.fillText(`Press r to Play again`,0,100, 30)
        }
    }

    reset(){
        this.board = this.createBoard();
        this.turn = 0;
        this.winner = 0;
        this.drawBoard();
    }
}
