<?php
	class movimentacoes
	{

		public function mostrar()
		{
			$con = new PDO('mysql: host=locahost; dbname=orgafin;','root','');

			$sql = "SELECT valor, nome, data, categoria, id FROM input";
			$sql = $con->prepare($sql);
			$sql->execute();

			$resultados = array();

			while($row = $sql->fetch(PDO::FETCH_ASSOC)) {
				$resultados[] = $row;
			}

			if (!$resultados) {
				throw new Exception("Nenhum movimentacao cadastrada :(");
			}
			
			return $resultados;
        }
        public function cadastrar()
		{
			$con = new PDO('mysql: host=locahost; dbname=filial;','root','');

            $valor = $_GET['valorMov'];//get esta como teste * trocar para POST na versao final
            $nome = $_GET['nomeMov'];
            $data = $_GET['dataMov'];
            $tipo = $_GET['tipoMov'];
			$sql = "INSERT INTO input (valor,nome,data,categoria,idUser) VALUES ('$valor','$nome','$data','$categoria','$idUser')";
			$sql = $con->prepare($sql);
			$sql->execute();

			$resultados = array();

			while($row = $sql->fetch(PDO::FETCH_ASSOC)) {
				$resultados[] = $row;
			}

			if (!$resultados) {
				throw new Exception("erro");
			}
			
			return $resultados;
		}
	}
	?>