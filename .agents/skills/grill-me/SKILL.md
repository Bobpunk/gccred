---
name: grill-me
description: >-
  Use esta skill quando o usuário quiser alinhar um plano, arquitetura ou decisão de design através de uma entrevista interativa (perguntas e respostas detalhadas).
---

# Skill Grill-Me (Entrevista Interativa para Alinhamento)

Esta skill guia o agente a realizar uma sabatina/entrevista interativa com o usuário para esclarecer requisitos, decisões de arquitetura, trade-offs e preferências antes de iniciar a implementação de uma tarefa complexa.

## Quando Usar
- Quando o usuário digitar `/grill-me` ou solicitar uma sabatina de perguntas antes de criar um plano.
- Quando houver decisões ambíguas ou alternativas de design de software para resolver.

## Instruções do Processo

1. **Análise Inicial**:
   - Analise o pedido do usuário e o estado atual do código/projeto.
   - Identifique pontos cegos, decisões de arquitetura pendentes e alternativas de implementação.

2. **Entrevista Interativa**:
   - Faça de 2 a 4 perguntas diretas e objetivas de cada vez.
   - Apresente opções claras (com prós e contras sucintos) para cada decisão.
   - Espere a resposta do usuário antes de prosseguir para o próximo bloco de perguntas.

3. **Consolidação do Plano**:
   - Após coletar todas as respostas, consolide as decisões no `implementation_plan.md` e apresente para aprovação final do usuário.
