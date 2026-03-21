import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '20s', target: 20 }, // Ramp-up para 20 usuários em 20s
        { duration: '1m40s', target: 20 }, // Mantém 20 usuários por 1m40s
    ],
};

const users = [
    { username: 'user1_ebac', password: 'psw!ebac@test' },
    { username: 'user2_ebac', password: 'psw!ebac@test' },
    { username: 'user3_ebac', password: 'psw!ebac@test' },
    { username: 'user4_ebac', password: 'psw!ebac@test' },
    { username: 'user5_ebac', password: 'psw!ebac@test' },
];

export default function () {
    // Seleciona um usuário aleatório
    const user = users[Math.floor(Math.random() * users.length)];

    // Caso de Teste 1: Login
    let loginRes = http.post('http://lojaebac.ebaconline.art.br/minha-conta/', {
        username: user.username,
        password: user.password,
    });

    check(loginRes, {
        'login status 200': (r) => r.status === 200,
    });

    // Caso de Teste 2: Acesso à página protegida após login
    let protectedRes = http.get('http://lojaebac.ebaconline.art.br/minha-conta/orders/ HTTP/1.1', {
        headers: {
            // Exemplo: 'Authorization': `Bearer ${loginRes.json('token')}`,
        },
    });

    check(protectedRes, {
        'protected page status 200': (r) => r.status === 200,
    });

    sleep(1);
}