# Flacar Entregas

Plataforma web para solicitação e cálculo de entregas expressas da Flacar Entregas, serviço de motoboy focado no atendimento ao comércio local de Planalto, Capanema, Pérola do Oeste e Realeza (PR).

Projeto freelance desenvolvido para atender à demanda de digitalização dos pedidos da empresa, substituindo anotações manuais por um fluxo direto, transparente e integrado ao WhatsApp.

---

## Contexto e Desafio do Negócio

A Flacar Entregas opera com foco em pequenos e médios estabelecimentos comerciais (padarias, farmácias, mercadinhos e papelarias) que dependem de agilidade diária para despachar suas vendas.

Antes da solução, o cliente enfrentava:
- Gargalo no atendimento com dúvidas repetitivas sobre preços por quilometragem e cidades cobertas.
- Falta de padronização nas informações passadas pelos lojistas (endereços incompletos e tipo de carga indefinido).
- Insegurança dos novos lojistas em relação a contratos de fidelidade ou taxas de mensalidade.

---

## Soluções Desenvolvidas

1. **Calculadora Dinâmica de Frete**
   - Regra transparente: taxa de saída de R$ 8,00 somada a R$ 2,50 por quilômetro rodado.
   - Adicionais parametrizáveis para espera no local (a cada 15 min), chuva e volume pesado.
   - Detalhamento de custos em tempo real para eliminar surpresas na cobrança.

2. **Formulário Padronizado de Pedidos**
   - Validação em tempo real dos dados obrigatórios de coleta, entrega e contato.
   - Geração de mensagem pronta e estruturada diretamente para o canal oficial de atendimento.
   - Histórico local no dispositivo para facilitar pedidos recorrentes da mesma loja.

3. **Adequação à LGPD e Privacidade**
   - Mascaramento de dados sensíveis de contato e endereço no histórico do navegador.
   - Mecanismo explícito para o usuário excluir seu histórico local a qualquer momento.
   - Termo formal de privacidade especificando finalidade e base legal da operação de entrega.

4. **Página de Divulgação (Link na Bio)**
   - Versão compacta otimizada para tráfego vindo de redes sociais (Instagram e Facebook).
   - Destaque para os diferenciais de confiança, tempo médio de coleta (até 30 min) e ausência de mensalidade.

---

## Tecnologias Utilizadas

- **React 18** com **TypeScript**: interface reativa, tipagem estrita e arquitetura baseada em domínios (`features/`).
- **Tailwind CSS**: layout responsivo e mobile-first, seguindo a paleta de cores corporativa da marca (Navy Blue `#0D1B2A` e Laranja `#FF6B00`).
- **Vite**: ferramentas de build de alta performance e empacotamento otimizado para produção.
- **Cabeçalhos de Segurança HTTP**: configuração via `vercel.json` com regras de Content Security Policy (CSP), anti-clickjacking (`X-Frame-Options: DENY`) e bloqueio de sniffing de conteúdo.

---

## Estrutura do Repositório

```text
flacar/
├── src/
│   ├── app/                # Ponto de montagem da aplicação
│   ├── components/         # Elementos compartilhados (Header, Footer, Modais)
│   ├── config/             # Constantes de negócio centralizadas
│   ├── features/
│   │   ├── calculator/     # Regras e componentes da calculadora de frete
│   │   ├── landing/        # Seções informativas e mapa de cobertura
│   │   ├── orders/         # Formulário de pedido e histórico
│   │   └── promo/          # Visualização compacta para divulgação
│   └── utils/              # Formatadores monetários, sanitização e persistência
├── public/
├── vercel.json             # Cabeçalhos de segurança para deploy na Vercel
├── package.json
└── vite.config.ts
```

---

## Como Rodar Localmente

Pré-requisito: Node.js 18 ou superior instalado.

1. Clone o repositório:
```bash
git clone https://github.com/felaaass/Flacar.git
cd Flacar
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Para gerar o build de produção:
```bash
npm run build
```

---

## Deploy e Publicação

A aplicação está configurada para deploy contínuo na Vercel:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Root Directory:** `./`
