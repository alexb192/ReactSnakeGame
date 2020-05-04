import React, { Component } from 'react';
import './Snakegame.css';
const gridSize = 20;

class Snakegame extends Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            snakeSize: 3,
            posx: 0,
            posy: 0,
            direction: "right",
            pastCoordinates: [],
            foodx: 1,
            foody: 0,
            extendSnakeToken: false
        }

        window.setInterval(() =>
        {
            this.DisplaySnake();
            this.Move();
        }, 150)

        document.getElementById("body").addEventListener("keydown", (e) => {
            switch(e.keyCode)
            {
                case 37:    this.setState({direction: "left"});
                    break;
                case 38:    this.setState({direction: "up"});
                    break;
                case 39:    this.setState({direction: "right"});
                    break;
                case 40:    this.setState({direction: "down"});
                    break;
                default:
            }
        });

    }

    Overflow = (number) =>
    {
        if (number >= gridSize)
        {
            return number - gridSize;
        }
        else if (number < 0)
        {
            return number + gridSize;
        }
        else
        {
            return number;
        }
    }


    CreateGrid = () =>
    {
        let grid = []
        
        for (let column = 0; column < gridSize; column++)
        {
            let children = [];

            for (let row = 0; row < gridSize; row++)
            {
                children.push(<td id={`(${row}, ${column})`}></td>)
            }
            grid.push(<tr>{children}</tr>)
        }

        return grid;

    }

    DisplaySnake = () => {

        document.getElementById(`(${this.state.posx}, ${this.state.posy})`).style.backgroundColor = "white";

        let coordinate = {
            x: this.state.posx,
            y: this.state.posy
        }

        this.state.pastCoordinates.push(coordinate);

        if (this.state.pastCoordinates.length > 3)
        {
            let tempArray = this.state.pastCoordinates;
            document.getElementById(`(${tempArray[0].x}, ${tempArray[0].y})`).style.backgroundColor = "black";

            if (this.state.extendSnakeToken == false)
                    tempArray.shift();
            else 
                this.setState({extendSnakeToken: false});

            this.setState({pastCoordinates: tempArray})
        }

    }

    Move = () => {

        switch(this.state.direction)
        {
            case "left":    this.setState({posx: this.Overflow(this.state.posx - 1)});
            break;
            case "right":   this.setState({posx: this.Overflow(this.state.posx + 1)});
            break;
            case "down":    this.setState({posy: this.Overflow(this.state.posy + 1)});
            break;
            case "up":      this.setState({posy: this.Overflow(this.state.posy - 1)});
            break;
        }

        this.LoseCheck();
        this.LookForFood();

    }

    LoseCheck = () => {
        let coordinates = {
            x: this.state.posx,
            y: this.state.posy
        }

        if (this.state.pastCoordinates.find(obj => {
            return ((obj.x == this.state.posx) && (obj.y == this.state.posy))
        }))
        {
            let tempArray = this.state.pastCoordinates;

            tempArray.forEach((c) =>
            {
                document.getElementById(`(${c.x}, ${c.y})`).style.backgroundColor = "black";
            })

            let replacement = tempArray.splice(Math.max(tempArray.length - 3, 1));
            this.setState({pastCoordinates: replacement});
        }

    }

    SpawnFood = () => {
        let x = Math.floor(Math.random() * 20);
        let y = Math.floor(Math.random() * 20);

        this.setState({foodx: x})
        this.setState({foody: y})
        document.getElementById(`(${this.state.foodx}, ${this.state.foody})`).style.backgroundColor = "orange";
    }

    LookForFood = () => {
        if ((this.state.posx == this.state.foodx) && (this.state.posy == this.state.foody))
        {
            this.setState({snakeSize: this.state.snakeSize + 1});
            this.setState({extendSnakeToken: true});
            this.SpawnFood();
        }
    }

    render()
    {

        return  (
            <div className="SnakeGameContainer">
                <table>
                    {this.CreateGrid()}
                </table>
                <body id="testing"></body>
            </div>
        )

    }

}

export default Snakegame;