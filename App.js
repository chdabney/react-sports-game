function Team(props) {
    let shotPercentageDiv

    if (props.stats.shots) {
        const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
        shotPercentageDiv = (
            <div>
                <h3>Accuracy: {shotPercentage}%</h3>
            </div>
        )
    }
    return (
        <div className='Team'>
            <h2>{props.name}</h2>

            <div className='identity'>
                <img src={props.logo} alt={props.name} />
            </div>

            <div>
                <h3>Shots: {props.stats.shots}</h3>
            </div>

            <div>
                <h3>Score: {props.stats.score}</h3>
            </div>

            {shotPercentageDiv}

            <button onClick={props.shotHandler}>Attack!</button>

        </div>
    )
}

function ScoreBoard(props) {
    return (
        <div className='ScoreBoard'>
            <div className='teamStats'>
                <h3>VISITORS</h3>
                <h3>{props.visitingTeamStats.score}</h3>
            </div>
            <h3>SCOREBOARD</h3>
            <div className='teamStats'>
                <h3>HOME</h3>
                <h3>{props.homeTeamStats.score}</h3>
            </div>
        </div>
    )
}


class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            resetCount: 0,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }
        this.shotSound = new Audio('./sounds/miss.mp3')
        this.scoreSound = new Audio('./sounds/hit.mp3')
        this.allianceWin = new Audio('./sounds/allianceWin.mp3')
        this.hordeWin = new Audio('./sounds/hordeWin.mp3')
    }

    shoot = (team) => {
        const teamStatsKey = `${team}TeamStats`
        let score = this.state[teamStatsKey].score
        this.shotSound.play()
        if (Math.random() > 0.5) {
            score += 1

            setTimeout(() => {
                this.scoreSound.play()
            }, 100)
        }

        this.setState((state, props) => ({
            [teamStatsKey]: {

                shots: state[teamStatsKey].shots + 1,
                score
            }
        }))
    }

    resetGame = () => {
        this.setState((state, props) => ({
            resetCount: state.resetCount + 1,
            homeTeamStats: {
                shots: 0,
                score: 0,
            },
            visitingTeamStats: {
                shots: 0,
                score: 0,
            }
        }))

    }


    checkWin = () => {
        if (this.state.visitingTeamStats.score === this.state.homeTeamStats.score) {
            alert('Draw!')
        } else if (this.state.visitingTeamStats.score > this.state.homeTeamStats.score) {
            alert('Alliance Wins!')
            this.allianceWin.play()
        } else {
            alert('Horde Wins!')
            this.hordeWin.play()
        }


    }

    wrapperFunction = () => {
        this.resetGame()
        this.checkWin()
    }


    render() {
        return (
            <div>
                <div className='scoreBoard'>
                    <ScoreBoard
                        visitingTeamStats={this.state.visitingTeamStats}
                        homeTeamStats={this.state.homeTeamStats}
                    />
                </div>
                <div className='venueHeader'>
                    <h1>Welcome to {this.props.venue}!</h1>
                </div>
                <div className='wrapper'>
                    <div className='stats'>
                        <Team
                            name={this.props.visitingTeam.name}
                            logo={this.props.visitingTeam.logoSrc}
                            stats={this.state.visitingTeamStats}
                            shotHandler={() => this.shoot('visiting')}
                        />
                    </div>

                    <div className='resetGame'>
                        <h2>Resets: {this.state.resetCount}</h2>
                        <button onClick={this.wrapperFunction}>Reset Game</button>
                    </div>

                    <div className='stats'>
                        <Team
                            name={this.props.homeTeam.name}
                            logo={this.props.homeTeam.logoSrc}
                            stats={this.state.homeTeamStats}
                            shotHandler={() => this.shoot('home')}
                        />
                    </div>
                </div>
            </div>
        )
    }
}



function App(props) {
    const alliance = {
        name: 'The Alliance',
        logoSrc: './images/alliance3.png'
    }

    const horde = {
        name: 'The Horde',
        logoSrc: './images/horde3.png'
    }


    return (
        <div>
            <Game
                venue='Alterac Valley'
                homeTeam={horde}
                visitingTeam={alliance}
            />
        </div>

    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)