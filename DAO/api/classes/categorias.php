<?php

	class categorias
	{
		public function mostrar()
		{
			$con = new PDO('mysql: host=locahost; dbname=orgafin;','root','');

			$sql = "SELECT * FROM tipomov ORDER BY id ASC";
			$sql = $con->prepare($sql);
			$sql->execute();

			$resultados = array();
 
			while($row = $sql->fetch(PDO::FETCH_ASSOC)) {
				$resultados[] = $row;
			}

			if (!$resultados) {
				throw new Exception("Nenhum categoria cadastrada :(");
			}
			
			return $resultados;
        }
        public function cadastrar()
		{
			$con = new PDO('mysql: host=locahost; dbname=orgafin;','root','');

            //get esta como teste * trocar para POST na versao final
            $nome = $_GET['nomeMov'];
           
			$sql = "INSERT INTO tipomov (nome)
            VALUES ( '{$nome}' ) ";
			$sql = $con->prepare($sql);
			$sql->execute();

			$resultados = array();

			while($row = $sql->fetch(PDO::FETCH_ASSOC)) {
				throw new Exception("erro");
			}

			if (!$resultados) {
                return "sucesso";
			}
			
			return $resultados;
		}
	}
	?>