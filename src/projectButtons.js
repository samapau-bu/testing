// projectButtons.js

const ProjectButtons = () => {
    const projects = [
        { name: 'Project 1', link: 'https://github.com/samapau-bu/asynchronous-web-development/blob/main/web.jpg' },
        { name: 'Project 2', link: 'https://github.com/samapau-bu/asynchronous-web-development/blob/main/app.png' },
        { name: 'Project 3', link: 'https://github.com/samapau-bu/asynchronous-web-development/blob/main/design.png' },
        { name: 'Project 4', link: 'https://github.com/samapau-bu/asynchronous-web-development/blob/main/mobile.png' },
    ];

    return (
        <div className="project-buttons">
            {projects.map((project, index) => (
                <a key={index} href={project.link} className="project-button">
                    {project.name}
                </a>
            ))}
        </div>
    );
};

// Render the ProjectButtons component into the root div
ReactDOM.render(<ProjectButtons />, document.getElementById('root'));
