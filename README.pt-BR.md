# RSAutoPriceUpdater

🇧🇷 Português | [🇺🇸 English](README.md)

Acompanhe automaticamente dados do Mercado Geral do RuneScape diretamente no Google Planilhas.

O RSAutoPriceUpdater cria uma planilha que mantém informações de itens do RuneScape sempre atualizadas, incluindo preços, volume de negociações, limites de compra, valores de alquimia avançada e informações sobre itens exclusivos para membros.

Projetado para comerciantes, flippers, skillers e entusiastas de planilhas que desejam utilizar os dados do mercado geral sem precisar atualizá-los manualmente.

## Funcionalidades

* Atualização automática de preços
* Indicadores de volume de negociações
* Indicadores de limite de compra
* Indicadores de valores de alquimia avançada
* Indicadores de itens exclusivos para membros
* Exibição automática de ícones dos itens
* Atualizações automáticas a cada 2 horas
* Atualização manual sob demanda
* Fácil integração com outras planilhas

## Dados disponíveis

Para cada item monitorado, a planilha preenche automaticamente:

| Campo                 | Descrição                                          |
| --------------------- | -------------------------------------------------- |
| Icon                  | Ícone do item                                      |
| Item ID               | ID do item no RuneScape                            |
| Item name             | Nome do item (em inglês)                           |
| Price                 | Preço mais recente do Mercado Geral               |
| Limit                 | Limite de compra                                   |
| Volume                | Volume recente de negociações                      |
| High alch             | Valor de alquimia avançada                         |
| Members only          | Indica se o item é exclusivo para membros          |
| Last GE update        | Data da última atualização dos dados no MG         |
| Last Attempted update | Data da última atualização realizada pela planilha |

## Como funciona

A versão 3 utiliza dados disponibilizados pelo projeto comunitário Weird Gloop RuneScape Data Project.

Em vez de realizar uma requisição para cada item individualmente, o script obtém uma base completa de dados do mercado em uma única requisição e atualiza todos os itens monitorados localmente.

Essa abordagem oferece:

* Atualizações mais rápidas
* Menor utilização de APIs
* Maior confiabilidade
* Mais informações por item
* Manutenção simplificada

## Instalação

1. Abra uma planilha do Google Sheets.
2. Acesse **Extensões → Apps Script**.
3. Copie o conteúdo do arquivo `RSAutoPriceUpdater.gs` para o editor.
4. Salve o projeto.
5. Recarregue a planilha.
6. Abra o menu **RuneScape Price Updater**.
7. Clique em **Generate price sheet**.

## Utilização

1. Gere a planilha de preços.
2. Insira os IDs dos itens na coluna **Item ID**.
3. Execute **Update prices** ou aguarde a atualização automática.
4. Utilize os preços em outras planilhas através de referências como:

```excel
=Prices!D2
```

Substitua o número da linha pelo item desejado.

## Exemplo

Monitore itens como:

| Item ID | Item              |
| ------- | ----------------- |
| 2       | Cannonball        |
| 4151    | Abyssal whip      |
| 554     | Fire rune         |
| 23685   | Eldritch crossbow |

A planilha preencherá automaticamente todos os demais campos.

## Destaques da versão 3

A versão 3 representa uma grande modernização do projeto original e inclui:

* Migração de consultas individuais por item para carregamento completo dos dados de mercado
* Atualizações significativamente mais rápidas
* Suporte a volume de negociações
* Suporte a limites de compra
* Suporte a valores de alquimia avançada
* Suporte a informações de itens exclusivos para membros
* Fluxo de atualização simplificado
* Melhor confiabilidade e facilidade de manutenção

## Créditos

### Projeto original

* Zenyl (Reddit: u/zenyl, RSN: Zenyl)

### Modernização (Versão 3)

* Tristonho (RSN: Tristonho)

### Dados do Mercado Geral

Agradecimentos especiais ao Gaz (Gaz GEBot) e aos colaboradores do Weird Gloop RuneScape Data Project por manterem este valioso recurso para a comunidade do RuneScape.

## Aviso legal

Este projeto não é afiliado nem endossado pela Jagex Ltd.

RuneScape é uma marca registrada da Jagex Ltd.

## Licença

GNU General Public License v3.0
