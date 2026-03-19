const request = require('supertest');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const couponSchema = require('../contracts/coupon.schema.json');

const BASE_URL = 'lojaebac.ebaconline.art.br/wp-json';
const AUTH_USER = 'admin_ebac';
const AUTH_PASS = '@admin!&b@c!2022';

const generateRandomDescription = () => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return `cupom${randomNumber}`;
};

describe('External store coupon API (lojaebac)', () => {
  const externalApi = request(BASE_URL);

  it('Get API coupons', async () => {
    const response = await request('lojaebac.ebaconline.art.br/wp-json')
      .get('/wc/v3/coupons')
      .auth('admin_ebac', '@admin!&b@c!2022')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(0);

    if (response.body.length > 0) {
      const valid = ajv.validate(couponSchema, response.body[0]);
      if (!valid) {
        console.error('Contract validation errors:', ajv.errors);
      }
      expect(valid).toBe(true);
    }
  }, 30000);

  it('Teste sem autenticação', async () => {
    await externalApi
      .get('/wc/v3/coupons')
      .set('Accept', 'application/json')
      .timeout(10000)
      .expect(401);
  }, 30000);

  it('Teste com autenticação inválida', async () => {
    await externalApi
      .get('/wc/v3/coupons')
      .auth('invalid_user', 'invalid_pass')
      .set('Accept', 'application/json')
      .timeout(10000)
      .expect(500);
  }, 30000);

  it('Teste com ID de cupom inválido', async () => {
    await externalApi
      .get('/wc/v3/coupons/99999')
      .auth(AUTH_USER, AUTH_PASS)
      .set('Accept', 'application/json')
      .timeout(10000)
      .expect(404);
  }, 30000);

  it('Criar novo cupom com descrição aleatória', async () => {
    const randomDescription = generateRandomDescription();
    const couponCode = `PROMO${Date.now()}`;

    const payload = {
      code: couponCode,
      discount: Math.floor(Math.random() * 90) + 1,
      description: randomDescription
    };

    const response = await externalApi
      .post('/wc/v3/coupons')
      .auth(AUTH_USER, AUTH_PASS)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(payload)
      .timeout(10000)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.code.toLowerCase()).toBe(couponCode.toLowerCase());
    expect(response.body.description).toBe(randomDescription);

    const valid = ajv.validate(couponSchema, response.body);
    if (!valid) {
      console.error('Contract validation errors:', ajv.errors);
    }
    expect(valid).toBe(true);

    console.log(`✓ Cupom criado com sucesso: ${couponCode}`);
    console.log(`  Descrição: ${randomDescription}`);
    console.log(`  Desconto: ${payload.discount}%`);
  }, 30000);

  it('Cumpom com código duplicado', async () => {
    // Primeiro, cria um cupom com código único
    const uniqueCode = `DUPLICATE${Date.now()}`;
    const description1 = generateRandomDescription();

    const payload1 = {
      code: uniqueCode,
      discount: 10,
      description: description1
    };

    // Cria o primeiro cupom
    const response1 = await externalApi
      .post('/wc/v3/coupons')
      .auth(AUTH_USER, AUTH_PASS)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(payload1)
      .timeout(10000)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response1.body).toHaveProperty('id');
    expect(response1.body.code.toLowerCase()).toBe(uniqueCode.toLowerCase());

    console.log(`✓ Primeiro cupom criado: ${uniqueCode}`);

    // Agora tenta criar um segundo cupom com o mesmo código
    const description2 = generateRandomDescription();
    const payload2 = {
      code: uniqueCode, // Mesmo código
      discount: 20,
      description: description2
    };

    // Deve falhar com erro de duplicata
    const response2 = await externalApi
      .post('/wc/v3/coupons')
      .auth(AUTH_USER, AUTH_PASS)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(payload2)
      .timeout(10000)
      .expect('Content-Type', /json/)
      .expect((res) => {
        if (res.status !== 400 && res.status !== 409 && res.status !== 500) {
          throw new Error(`Expected 400, 409 or 500 for duplicate code, got ${res.status}`);
        }
      });

    // Verifica que o segundo cupom não foi criado
    expect(response2.body).toHaveProperty('code');
    expect(response2.body.code).toBe('woocommerce_rest_coupon_code_already_exists');

    console.log(`✓ Tentativa de duplicata rejeitada corretamente: ${uniqueCode}`);
  }, 30000);
});
