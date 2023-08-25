# Projeto Interdisciplinar II - Sistemas de Informação ESPM

<p style="text-align: center;">
    <a href="https://www.espm.br/cursos-de-graduacao/sistemas-de-informacao/"><img src="https://avatars.githubusercontent.com/u/49880458?s=200&v=4" alt="Sistemas de Informação ESPM" style="height: 200px; width: 200px;"/></a>
</p>

# EduReview

### 2023-02

## Integrantes
- [Luigi Tomassone](https://github.com/Luigi052/)
- [Felipe de Arruda](https://github.com/FelipeBotelho94/)
- [Gabriel Fuzita](https://github.com/Garibaldo95/)
- [Rafael Ambrosio](https://github.com/rafaoambrosio/)
- [Gustavo Fabisiak](https://github.com/Fbk21/)
## Descrição do Projeto

Problema Original:
O processo educacional, em muitas instituições, carece de um sistema eficiente de feedback direto dos alunos sobre o desempenho dos professores. Enquanto os alunos têm perspectivas únicas sobre a eficácia do ensino, muitas vezes essas opiniões são subutilizadas ou até mesmo ignoradas. Além disso, muitos sistemas de avaliação existentes focam em avaliações gerais do corpo docente, ao invés de avaliações específicas para cada matéria lecionada, o que pode não refletir com precisão o desempenho de um professor em áreas individuais.

Objetivo Final:
O projeto propõe o desenvolvimento de um site onde alunos possam avaliar seus professores individualmente por matéria. Cada professor terá um perfil único no site, que exibirá todas as avaliações associadas a eles, categorizadas por matéria. Isso permitirá que os alunos ofereçam feedbacks detalhados sobre o desempenho do professor em uma matéria específica, destacando pontos fortes e áreas de melhoria.

Os alunos poderão classificar os professores usando uma variedade de critérios, como clareza de ensino, disponibilidade para esclarecer dúvidas, eficácia em manter a turma engajada, entre outros. Os professores, por sua vez, poderão acessar essas avaliações para obter insights valiosos sobre seu próprio desempenho e áreas onde podem melhorar.

Além das avaliações, o site também incentivará os alunos a deixarem comentários construtivos, garantindo um feedback qualitativo adicional. Uma moderação rigorosa será implementada para garantir que os comentários sejam respeitosos e construtivos, promovendo um ambiente saudável e produtivo para todos os usuários.

Principais Recursos:
- Perfis Individuais para Professores:
- Foto e breve biografia do professor.
- Listagem de todas as matérias que lecionam.
- Média de avaliação geral e por matéria.

Sistema de Avaliação por Matéria:
- Opção para avaliar o professor com base em diferentes critérios.
- Seção para comentários escritos.

Moderação de Comentários:
- Pesquisa por nome do professor ou matéria .
- Filtros para ordenar por melhores avaliações, mais avaliados, entre outros.

Dashboard para Professores:
- Visão geral das próprias avaliações.
- Insights sobre áreas de melhoria e pontos fortes.
- Sistema de Autenticação e Registro:
- Contas individuais para alunos e professores.
- Autenticação de e-mail para garantir comentários genuínos.

Análises e Estatísticas:
- Visão geral das avaliações para a administração da instituição.
- Rankings dos professores mais bem avaliados.
- Feedback Construtivo:
- Diretrizes claras para incentivar comentários construtivos e úteis.
- Dicas para alunos sobre como fornecer feedback eficaz.

# Detalhes de Configuração

```
Aqui deve ser colocado o conteúdo do arquivo .env e/ou de outros arquivos de configuração, ou detalhes de arquivos ou pastas que não estão no repositório do projeto, mas que devem existir para que o projeto possa ser executado com sucesso.

Por exemplo, a descrição do conteúdo do arquivo .env, ou nomes de pastas que precisam existir.

(Remover esse aviso na versão final)
```

Para funcionar corretamente, devem ser criados os seguintes arquivos/pastas nos caminhos especificados, com o conteúdo especificado:

- O arquivo `.env` deve ser criado em `/`, com o conteúdo abaixo:
```
app_localIp=0.0.0.0
app_port=3000
app_root=
# Não pode terminar com barra /
app_urlSite=http://localhost:3000
app_cookie=[NOME DO COOKIE]
app_cookieSecure=0
app_staticFilesDir=public
app_disableStaticFiles=0
app_sqlConfig_connectionLimit=30
app_sqlConfig_waitForConnections=1
app_sqlConfig_charset=utf8mb4
app_sqlConfig_host=localhost
app_sqlConfig_port=3306
app_sqlConfig_user=[USUÁRIO DO BANCO]
app_sqlConfig_password=[SENHA DO USUÁRIO DO BANCO]
app_sqlConfig_database=[NOME DO BANCO]
app_usuarioSenhaPadrao=[SENHA PADRÃO PARA NOVOS USUÁRIOS]
app_usuarioHashSenhaPadrao=[HASH DA SENHA PADRÃO PARA NOVOS USUÁRIOS]
# Não utilizar números > 0x7FFFFFFF pois os XOR resultarão em -1
app_usuarioHashId=[HASH DE 32 BITS PARA O ID EM HEXADECIMAL, COMO 0x1234ABCD]
```

- A pasta `dados` deve ser criada em `/`
- A pasta `imagens` deve ser criada em `/dados`

# Licença

Este projeto é licenciado sob a [MIT License](https://github.com/tech-espm/inter-2sem-2023-feedback/blob/main/LICENSE).
