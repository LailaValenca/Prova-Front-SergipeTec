
# Angular CRUD Employees

Aplicação Angular moderna para gerenciamento de funcionários, com operações completas de cadastro, busca, edição e remoção (CRUD), interface responsiva e backend simulado com JSON Server.

## 🎯 Funcionalidades

- **Listar funcionários** — Exibe todos os funcionários cadastrados em tabela responsiva
- **Buscar funcionários** — Filtro por nome (case-insensitive)
- **Criar funcionário** — Formulário validado (nome, email, cargo, status)
- **Editar funcionário** — Atualização de dados com preenchimento automático
- **Deletar funcionário** — Remoção com confirmação e atualização instantânea da lista

## 🛠️ Tecnologias Utilizadas

- Angular 21 (Standalone Components)
- Reactive Forms (validação reativa)
- RxJS (observables)
- JSON Server (backend REST fake)
- TypeScript

## 📦 Instalação e Execução

1. Clone o repositório e instale as dependências:
  ```bash
  git clone <repository-url>
  cd angular-crud-employees
  npm install
  ```

2. Inicie o backend (JSON Server):
  ```bash
  npx json-server --watch db.json --port 3000
  ```

3. Em outro terminal, inicie o frontend:
  ```bash
  npm start
  # ou
  ng serve
  ```

4. Acesse:
  - Frontend: http://localhost:4200/
  - Backend: http://localhost:3000/employees

## 🚀 Como Executar

### Terminal 1 — Backend (JSON Server)

```bash
npx json-server --watch db.json --port 3000
```

O servidor estará disponível em: http://localhost:3000/employees

### Terminal 2 — Frontend (Angular)

```bash
npm start
```

Ou manualmente:

```bash
ng serve
```

A aplicação estará disponível em: http://localhost:4200/


## 📁 Estrutura do Projeto

```
src/app/
├── models/
│   └── employee.model.ts          # Interface Employee
├── services/
│   └── employee.service.ts        # CRUD + Search service
├── employee-list/
│   ├── employee-list.ts           # Listar, buscar, deletar
│   ├── employee-list.html
│   ├── employee-list.css
│   └── employee-list.spec.ts
├── employees/
│   ├── employee-new/              # Criar novo
│   ├── employee-edit/             # Editar existente
│   └── employee-form/
│       ├── employee-form.ts       # Formulário reutilizável
│       ├── employee-form.html
│       ├── employee-form.css
│       └── employee-form.spec.ts
├── app.ts                         # App Component (root)
├── app.routes.ts                  # Rotas
└── app.config.ts                  # Configuração

db.json                            # Dados iniciais (JSON Server)
```


## 🔄 Fluxo de Telas e Dados

### 1. Listar Funcionários
```
EmployeeList -> EmployeeService.listAll() -> HTTP GET /employees -> UI Table
```

### 2. Buscar por Nome (Case-Insensitive)
```
Usuário digita "laila" -> onSearch() -> Service filtra local -> UI atualiza
```

### 3. Criar Novo Funcionário
```
Formulário -> EmployeeForm.onSubmit() -> Service.createEmployee() -> POST /employees -> Redirect to list
```

### 4. Editar Funcionário
```
Clique "Editar" -> Rota /employees/edit/:id -> Service.getEmployee() -> Formulário preenchido -> PUT /employees/:id
```

### 5. Deletar Funcionário
```
Clique "Deletar" + Confirmação -> Service.deleteEmployee() -> DELETE /employees/:id -> Lista recarregada
```


## 📝 Endpoints da API (JSON Server)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /employees | Listar todos |
| GET | /employees?name=:query | Filtrar por nome |
| GET | /employees/:id | Obter um funcionário |
| POST | /employees | Criar novo |
| PUT | /employees/:id | Atualizar |
| DELETE | /employees/:id | Deletar |


## 🧪 Testes

Para rodar os testes unitários:
```bash
npm test
```


## 📄 Validações do Formulário

| Campo | Validações |
|-------|-----------|
| Nome | Obrigatório |
| Email | Obrigatório + Formato válido |
| Cargo | Obrigatório |
| Status | Booleano (Ativo/Inativo) |


## 🔧 Dados de Exemplo (db.json)

db.json contém 4 funcionários padrão:

```json
{
  "employees": [
    { "id": 1, "name": "Ana", "email": "ana@empresa.com", "role": "Dev", "active": true },
    { "id": 2, "name": "Bruno", "email": "bruno@empresa.com", "role": "QA", "active": true },
    { "id": 3, "name": "Laila", "email": "laila.valenca007@gmail.com", "role": "Dev", "active": true },
    { "id": 4, "name": "Auto Test", "email": "autotest@example.com", "role": "Dev", "active": true }
  ]
}
```


## 🎨 Interface e Usabilidade

- Header fixo com busca e botão de novo funcionário
- Tabela responsiva com ações de editar/deletar
- Status visual (ativo/inativo)
- Feedbacks de sucesso/erro


## 🐛 Dicas e Solução de Problemas

### Porta 3000 já em uso
```bash
# Usar porta diferente
npx json-server --watch db.json --port 3001
# Atualizar ambiente ou service para usar a nova porta
```

### Porta 4200 já em uso
```bash
ng serve --port 4300
```


## 📚 Links Úteis

- Angular Docs: https://angular.dev
- JSON Server: https://github.com/typicode/json-server
- RxJS: https://rxjs.dev
- Reactive Forms: https://angular.dev/guide/forms/reactive-forms


## 📄 Licença

MIT
