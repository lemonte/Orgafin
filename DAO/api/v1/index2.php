<?php
header('Content-Type: application/json; charset: utf-8');

require_once '../classes/usuarios.php';
class Rest{
    public static function open($requisicao){
        $url = explode('/', $_REQUEST['url']);
        var_dump($_REQUEST);
        $classe=ucfirst($url[0]);
        array_shift($url);

        $metodo=$url[0];
        array_shift($url);

        $parametros = array();
        $parametros = $url;

        try{
            if(class_exists($classe)){
                if(method_exists($metodo)){
                    $retorno =  call_user_func_array(array(new $classe, $metodo), $parametros);
    
                    return json_encode(array('status'=> 'sucesso', 'dados' => $retorno));
    
                }else{
                 return json_encode(array('status'=> 'erro', 'dados' => 'metodo inexistente'));
            }
            }else{
                 return json_encode(array('status'=> 'erro', 'dados' => 'classe inexistente'));
            }
        }catch(Exeption $e){
            return json_encode(array('status'=> 'erro', 'dados' => $e->getMessage())); 
        }

    }
}
if(isset($_REQUEST)){
   echo Rest::open($_REQUEST);
var_dump($_REQUEST);
}
?>