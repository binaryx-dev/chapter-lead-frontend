import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import dummy from '../auth/dummy.json';
import randomColor from '@/functions/randomColor.js';
import { API_PREFIX, PROJECTS_URL, TASKS_URL } from '@/config/url.js';

const generateTasks = (idProject, max = 5) => {
  let cant = Math.floor(Math.random() * (max + 1));
  let array = [];
  for (let i = 0; i < cant; i++) {
    let createdAt = faker.date.past();
    let updatedAt = faker.date.between({from: createdAt, to: faker.date.recent()});
    let finishAt = faker.helpers
      .arrayElement([null, faker.date.between({from: updatedAt, to: faker.date.recent()})]);
    let status = ['pendiente', 'finalizado'];
    let statusIndex = Math.floor(Math.random() * status.length);

    let task = {
      id: (i+1),
      idProject,
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      idStatus: statusIndex,
      status: status[statusIndex],
      createdAt,
      updatedAt,
      finishAt,
    }
    array.push(task);
  }
  return array;
}

const generateProjects = (idUser, cant = 3) => {
  let array = [];
  for (let i = 0; i < cant; i++) {
    let createdAt = faker.date.past();
    let updatedAt = faker.date.between({from: createdAt, to: faker.date.recent()});
    let deletedAt = faker.helpers
      .arrayElement([null, faker.date.between({from: updatedAt, to: faker.date.recent()})]);
    let tasks = generateTasks((i+1), 5);
    let firstColor = randomColor.HEX(6);
    let secondColor = randomColor.HEX(6);
    let thirdColor = randomColor.HEX(6);

    let project = {
      id: (i+1),
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(['activo', 'inactivo']),
      tasks,
      totalTasks: tasks.length,
      pendingTasks: tasks.filter(x => x.idStatus == 0).length,
      finishTasks: tasks.filter(x => x.idStatus == 1).length,
      colorTasks: [
        firstColor,
        secondColor,
        thirdColor,
      ],
      creator: idUser,
      createdAt,
      updatedAt,
      deletedAt,
    }
    array.push(project);
  }

  return array;
}

export const ProjectHandler = [
  rest.get(`${API_PREFIX}${PROJECTS_URL}`, async (req, res, ctx) => {
    const token = req.headers.get('Authorization');
    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ message: 'No se ha encontrado el token de autenticación' })
      );
    }

    const user = dummy.users.find((user) => user.token === token.replace('Bearer ', ''));
    let jsonStr = localStorage.getItem('projects');
    let projects = [];
    if (jsonStr === null || jsonStr === undefined || jsonStr === '') {
      dummy.users.forEach(element => {        
        let list = generateProjects(element.id);
        projects = [...projects, ...list];
      });
      localStorage.setItem('projects', JSON.stringify(projects));
    } else projects = JSON.parse(jsonStr);
    projects = projects.filter(x => x.creator == user?.id);

    return res(
      ctx.status(200),
      ctx.json(projects)
    );
  }),
  rest.get(`${API_PREFIX}${TASKS_URL}/:id`, async (req, res, ctx) => {
    const id = req.params.id;
    const token = req.headers.get('Authorization');
    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ message: 'No se ha encontrado el token de autenticación' })
      );
    }

    const user = dummy.users.find((user) => user.token === token.replace('Bearer ', ''));
    let jsonStr = localStorage.getItem('projects') ?? '[]';
    let projects = JSON.parse(jsonStr);
    let project = projects.find(x => x.creator == user?.id && x.id == id);

    if (project === undefined || project === null) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'No se ha encontrado el proyecto' })
      );
    }else{
      return res(
        ctx.status(200),
        ctx.json(project)
      );
    }
  }),
];

export default ProjectHandler;