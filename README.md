# Tela de chamado para atendimento de uma clínica

Esta é uma versão de demonstração de um aplicativo de uso comercial.
Registro de pacientes armazenados em um servidor são acessados por uma página web, que monitora os pacientes chamados e em espera.

## Servidor de desenvolvimento
Inicialize o servidor NodeJS em /mock-api
```bash
npm start
```

Inicialize o servidor NextJS em /ui
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000). Execute login (qualquer cpf e senha serão válidos).

## Anúncios

Para inserir anúncios na página de espera, basta armazenar as imagens com qualquer nome e formato válido na pasta `ui/public/ads`.
O tempo de alternância entre as imagens pode ser customizado alterando a variável `AD_INTERVAL` em `ui/src/global.ts`
Este recurso funciona graças ao uso da SSR do NextJS, que permite usar a biblioteca FS do Node

## Refresh do SWR

A taxa de refresh do SWR (em ms) pode customizada alterando pela variável global `SWR_REFRESH_INTERVAL`, armazenada em `ui/src/global.ts`. 

## Tempo que Popup fica na tela

O tempo que o Popup de chamada de novos pacientes fica na tela é configurado pela variável global `POPUP_MS`, armazenada em `ui/src/global.ts` 
