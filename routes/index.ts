import { get } from "http";
import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		let t5c, t5m, t5p, top
        await app.sql.connect(async (sql) => {
            t5c = await sql.query("SELECT id, nome, mediaGeral FROM curso ORDER BY mediaGeral DESC LIMIT 5");
			t5m = await sql.query("SELECT id, nome, mediaGeral FROM materia ORDER BY mediaGeral DESC LIMIT 5");
			t5p = await sql.query("SELECT id, nome, mediaGeral FROM professor ORDER BY mediaGeral DESC LIMIT 5");

		});
        let opcoes = {
            titulo: "Home",
			top: {
				cursos: t5c,
				materias: t5m,
				professores: t5p
			}
        };
		res.render("index/index", opcoes);
	}

	public async sobre(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Sobre"
		};

		res.render("index/sobre", opcoes);
	}


	public async perfil(req: app.Request, res: app.Response) {
		let perfil;
		let tipo;
		let getid = req.query.id.toString()
		let id = getid;
		let data;
		let avaliacoes;

		console.log(getid)
		await app.sql.connect(async (sql) => {
			if (getid.includes("prof")) {
				data = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaNotaQualidade, mediaNotaSocial, mediaNotaConteudo, mediaNotaMetodos, mediaNotaHumor, mediaNotaLeniencia, mediaNotaCompreensao,mediaNotaExpectativas,mediaGeral,numeroMaterias,dataContratacao,cargo,areaAtuacao,numeroPremios,numeroAvaliacoes,porcentagemAprovacao FROM professor WHERE id = ?", [
				id,
				]);
				tipo = 'professor'
			}

			else if (getid.includes("cur")) {
				data = await sql.query("SELECT id, nome, foto, descricao, curtidas, coordenador, mediaNotaConforto, mediaNotaEmpregabilidade, mediaNotaDificuldade, mediaNotaCargaHoraria, mediaNotaAmenidades, mediaNotaAproveitamento, mediaNotaAprendizado, mediaNotaExpectativas, mediaGeral, anosFormacao, dataCriacao, cidadeLocalizacao, unidade, numeroPremios, numeroAvaliacoes, porcentagemAprovacao FROM curso WHERE id = ?", [
					getid,
				]);
				tipo = 'curso'
			}

			else if (getid.includes("mat")) {
				data = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaNotaDificuldade, mediaNotaAprendizado, mediaNotaConteudo, mediaNotaCargaHoraria, mediaNotaLocalizacao, mediaNotaEstrutura, mediaNotaImportancia, mediaNotaExpectativas, mediaGeral, numeroCursos, periodo, semestre, modoAula, numeroPremios, numeroAvaliacoes, porcentagemAprovacao FROM materia WHERE id = ?", [
					id,
				]);
				tipo ='materia'
			}

			avaliacoes = await sql.query("SELECT id, textoObservacoes, nomeOpcional, cursoOpcional, semestreOpcional, nota1, nota2, nota3, nota4, nota5, nota6, nota7, nota8, respostas, data FROM avaliacao WHERE refid = ?", [id]);
		});

		let opcoes = {
			titulo: "Perfil",
			perfil: data[0],
			tipo: tipo,
			avaliacoes: avaliacoes
		};

		res.render('index/perfil', opcoes);
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
		let sqlMats, melhorCon, melhorEst, melhorApr, melhores3;
        await app.sql.connect(async (sql) => {
            sqlMats = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaGeral, numeroCursos, periodo, semestre, modoAula, numeroPremios, numeroAvaliacoes, porcentagemAprovacao FROM materia");
            melhorCon = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaGeral, numeroCursos, periodo, semestre, modoAula, numeroPremios, numeroAvaliacoes, porcentagemAprovacao, mediaNotaConteudo FROM materia ORDER BY mediaNotaConteudo DESC LIMIT 1");
            melhorEst = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaGeral, numeroCursos, periodo, semestre, modoAula, numeroPremios, numeroAvaliacoes, porcentagemAprovacao, mediaNotaEstrutura FROM materia ORDER BY mediaNotaEstrutura DESC LIMIT 1");
            melhorApr = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaGeral, numeroCursos, periodo, semestre, modoAula, numeroPremios, numeroAvaliacoes, porcentagemAprovacao, mediaNotaAprendizado FROM materia ORDER BY mediaNotaAprendizado DESC LIMIT 1");
             
		});
		let opcoes = {
			titulo: "Matérias",
			data: sqlMats,
			melhores3: [melhorCon[0], melhorEst[0], melhorApr[0]]
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
		let avaliado;
		let tipo;
		let getid = req.query.id.toString();
		let id = getid;
		let data;
		let avaliacoes;

		console.log(getid);
		await app.sql.connect(async (sql) => {
			if (getid.includes("prof")) {
				data = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaNotaQualidade, mediaNotaSocial, mediaNotaConteudo, mediaNotaMetodos, mediaNotaHumor, mediaNotaLeniencia, mediaNotaCompreensao,mediaNotaExpectativas,mediaGeral,numeroMaterias,dataContratacao,cargo,areaAtuacao,numeroPremios,numeroAvaliacoes,porcentagemAprovacao FROM professor WHERE id = ?", [
					id,
				]);
				tipo = 'professor';
			} else if (getid.includes("cur")) {
				data = await sql.query("SELECT id, nome, foto, descricao, curtidas, coordenador, mediaNotaConforto, mediaNotaEmpregabilidade, mediaNotaDificuldade, mediaNotaCargaHoraria, mediaNotaAmenidades, mediaNotaAproveitamento, mediaNotaAprendizado, mediaNotaExpectativas, mediaGeral, anosFormacao, dataCriacao, cidadeLocalizacao, unidade, numeroPremios, numeroAvaliacoes, porcentagemAprovacao FROM curso WHERE id = ?", [
					getid,
				]);
				tipo = 'curso';
			} else if (getid.includes("mat")) {
				data = await sql.query("SELECT id, nome, foto, descricao, curtidas, mediaNotaDificuldade, mediaNotaAprendizado, mediaNotaConteudo, mediaNotaCargaHoraria, mediaNotaLocalizacao, mediaNotaEstrutura, mediaNotaImportancia, mediaNotaExpectativas, mediaGeral, numeroCursos, periodo, semestre, modoAula, numeroPremios, numeroAvaliacoes, porcentagemAprovacao FROM materia WHERE id = ?", [
					id,
				]);
				tipo = 'materia';
			}

			avaliacoes = await sql.query("SELECT id, textoObservacoes, nomeOpcional, cursoOpcional, semestreOpcional, nota1, nota2, nota3, nota4, nota5, nota6, nota7, nota8, respostas, data FROM avaliacao WHERE refid = ?", [id]);
		});

		let opcoes = {
			titulo: "Avaliar",
			avaliado: data[0],
			tipo: tipo,
			avaliacoes: avaliacoes
		};

		res.render('index/avaliar', opcoes);
	}

	public async enviado(req: app.Request, res: app.Response) {
		let getav = req.query.av.toString()
		let avaliacao = JSON.parse(getav);

		await app.sql.connect(async (sql) => {
			await sql.query("INSERT INTO avaliacao (refid, textoObservacoes, nomeOpcional, cursoOpcional, semestreOpcional, nota1, nota2, nota3, nota4, nota5, nota6, nota7, nota8, curtida, data) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
				avaliacao.avidref,
				avaliacao.avobs,
				avaliacao.avnome,
				avaliacao.avcurso,
				avaliacao.avsemestre,
				avaliacao.avnota1,
				avaliacao.avnota2,
				avaliacao.avnota3,
				avaliacao.avnota4,
				avaliacao.avnota5,
				avaliacao.avnota6,
				avaliacao.avnota7,
				avaliacao.avnota8,
				avaliacao.avcurtida,
				avaliacao.avdata
			]);

			let notaProfs = ["mediaNotaQualidade", "mediaNotaSocial", "mediaNotaConteudo", "mediaNotaMetodos", "mediaNotaHumor", "mediaNotaLeniencia", "mediaNotaCompreensao", "mediaNotaExpectativas"]
			let notaMats = ["mediaNotaDificuldade", "mediaNotaAprendizado", "mediaNotaConteudo", "mediaNotaCargaHoraria", "mediaNotaLocalizacao", "mediaNotaEstrutura", "mediaNotaImportancia", "mediaNotaExpectativas"]
			let notaCurs = ["mediaNotaConforto", "mediaNotaEmpregabilidade", "mediaNotaDificuldade", "mediaNotaCargaHoraria", "mediaNotaAmenidades", "mediaNotaAproveitamento", "mediaNotaAprendizado", "mediaNotaExpectativas"]
			let tables = ['professor', 'materia', 'curso']
			let notas = [notaProfs, notaMats, notaCurs]
			
			for (let k = 0; k < tables.length; k++) {
				let table = tables[k];
				for (let l = 1; l < 9; l++) {
					let notaAtual = notas[k][l-1];
					await sql.query(`UPDATE ${table} SET ${notaAtual} = (SELECT AVG(nota${l}) FROM avaliacao WHERE ${table}.id = avaliacao.refid) WHERE EXISTS (SELECT 1 FROM avaliacao WHERE ${table}.id = avaliacao.refid);`)
				}
			}
		});

		let opcoes = {
			titulo: "Enviado",
			avaliacao: avaliacao
		};

		res.render('index/enviado', opcoes);
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
