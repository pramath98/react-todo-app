import './landingPage.css';

export default function LandingPage() {
    return (
        <>
            <div className="main-landing-container">
                <div className='hero-text-container'>
                    <span className='hero-subtext'>Your Personal</span>
                    <span className='hero-text'>Productivity Companion</span>
                </div>
                <div className='hero-todo-vector'>
                    <div className='hero-todo-vector-container'>
                        <div className='hero-todo-vector-container-header'>
                            <span className='hero-todo-vector-container-header-text'>Get things done!</span>
                            <span className='hero-todo-vector-container-header-line' />
                        </div>
                        <div className='hero-todo-vector-container-tasks'>
                            <span>Learn Mathematics</span>
                            <span>Go to Gym</span>
                            <span>Bring snacks for the party</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}