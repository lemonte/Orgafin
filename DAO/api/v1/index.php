<?php
header('Content-Type: application/json; charset=utf-8');

require_once '../classes/usuarios.php';
require_once '../classes/categorias.php';
require_once '../classes/movimentacoes.php';

class Rest
{
	
	public static function open($requisicao)
	{
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
		header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
		$url = explode('/', $requisicao['url']);
		
		$classe = ucfirst($url[0]);
		array_shift($url);

		$metodo = $url[0];
		array_shift($url);

		$parametros = array();
		$parametros = $url;

		try {
			if (class_exists($classe)) {
				if (method_exists($classe, $metodo)) {
					$retorno = call_user_func_array(array(new $classe, $metodo), $parametros);

					return json_encode(array('status' => 'sucesso', 'dados' => $retorno));
				} else {
					return json_encode(array('status' => 'erro', 'dados' => 'Método inexistente!'));
				}
			} else {
				return json_encode(array('status' => 'erro', 'dados' => 'Classe inexistente!'));
			}	
		} catch (Exception $e) {
			return json_encode(array('status' => 'erro', 'dados' => $e->getMessage()));
		}
		
	}
}

if (isset($_REQUEST)) {
	echo Rest::open($_REQUEST);
}