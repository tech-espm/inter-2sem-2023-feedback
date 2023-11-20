import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	public async sobre(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Sobre"
		};

		res.render("index/sobre", opcoes);
	}

	public async perfil(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Perfil"
		};

		res.render("index/perfil", opcoes);
	}

	public async cursos(req: app.Request, res: app.Response) {
		let sqlCursos, melhorApr1, melhorEmp, melhorApr2, melhores3;
        await app.sql.connect(async (sql) => {
            sqlCursos = await sql.query("SELECT id, nome, foto, descricao, curtidas, coordenador, mediaGeral, anosFormacao, dataCriacao, cidadeLocalizacao, unidade, numeroPremios, numeroAvaliacoes, porcentagemAprovacao FROM curso");
            melhorApr1 = await sql.query("SELECT id, nome, foto, descricao, curtidas, coordenador, mediaGeral, anosFormacao, dataCriacao, cidadeLocalizacao, unidade, numeroPremios, numeroAvaliacoes, porcentagemAprovacao, mediaNotaAproveitamento FROM curso ORDER BY mediaNotaAproveitamento DESC LIMIT 1");
            melhorEmp = await sql.query("SELECT id, nome, foto, descricao, curtidas, coordenador, mediaGeral, anosFormacao, dataCriacao, cidadeLocalizacao, unidade, numeroPremios, numeroAvaliacoes, porcentagemAprovacao, mediaNotaEmpregabilidade FROM curso ORDER BY mediaNotaEmpregabilidade DESC LIMIT 1");
            melhorApr2 = await sql.query("SELECT id, nome, foto, descricao, curtidas, coordenador, mediaGeral, anosFormacao, dataCriacao, cidadeLocalizacao, unidade, numeroPremios, numeroAvaliacoes, porcentagemAprovacao, mediaNotaAprendizado FROM curso ORDER BY mediaNotaAprendizado DESC LIMIT 1");

		});
        let opcoes = {
            titulo: "Cursos",
            data: sqlCursos,
            melhores3: [melhorApr1[0], melhorEmp[0], melhorApr2[0]]
        };
        res.render("index/cat_cursos", opcoes);
	}

	public async materias(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Matérias"
		};

		res.render("index/cat_materias", opcoes);
	}

	public async profs(req: app.Request, res: app.Response) {
		let sqlProfs, melhorMet, melhorCom, melhorQua, melhores3;
        await app.sql.connect(async (sql) => {
            sqlProfs = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaGeral, numeroMaterias, dataContratacao, cargo, areaAtuacao, numeroPremios, numeroAvaliacoes, porcentagemAprovacao FROM professor");
            melhorMet = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaGeral, numeroMaterias, dataContratacao, cargo, areaAtuacao, numeroPremios, numeroAvaliacoes, porcentagemAprovacao, mediaNotaMetodos FROM professor ORDER BY mediaNotaMetodos DESC LIMIT 1");
            melhorCom = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaGeral, numeroMaterias, dataContratacao, cargo, areaAtuacao, numeroPremios, numeroAvaliacoes, porcentagemAprovacao, mediaNotaCompreensao FROM professor ORDER BY mediaNotaCompreensao DESC LIMIT 1");
            melhorQua = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaGeral, numeroMaterias, dataContratacao, cargo, areaAtuacao, numeroPremios, numeroAvaliacoes, porcentagemAprovacao, mediaNotaQualidade FROM professor ORDER BY mediaNotaQualidade DESC LIMIT 1");
            
		});
        let opcoes = {
            titulo: "Professores",
            data: sqlProfs,
            melhores3: [melhorMet[0], melhorCom[0], melhorQua[0]]
        };
        res.render("index/cat_profs", opcoes);
	}

	public async avalie(req: app.Request, res: app.Response) {
		await app.sql.connect(async (sql) => {
            
		});
		let opcoes = {
			titulo: "Avaliar"
		};

		res.render("index/avaliar", opcoes);
	}

	public async produtos(req: app.Request, res: app.Response) {
		let produtoA = {
			id: 1,
			nome: "Produto A",
			valor: 25
		};

		let produtoB = {
			id: 2,
			nome: "Produto B",
			valor: 15
		};

		let produtoC = {
			id: 3,
			nome: "Produto C",
			valor: 100
		};

		let produtosVindosDoBanco = [ produtoA, produtoB, produtoC ];

		let opcoes = {
			titulo: "Listagem de Produtos",
			produtos: produtosVindosDoBanco
		};

		res.render("index/produtos", opcoes);
	}
}

export = IndexRoute;
