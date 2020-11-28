<?php

class usuarios{
    public function mostrar(){

        $con= new PDO('mysql: host=localhost; dbname=orgafin;','root', '');

        $sql= "SELECT * FROM conta";
        $sql = $con->prepare($sql);
        $sql->execute();
        
        $resultados= array();

        while($row = $sql->fetch(PDO::FETCH_ASSOC)){
            $resultados[]= $row;
        }
        if(!$resultados){
            throw new Exception("nenhum usuario cadastrado"); 
        }
       
        return $resultados;
    }
    public function cadastrar(){

        $con= new PDO('mysql: host=localhost; dbname=orgafin;','root', '');
        // Getting the received JSON into $json variable.
        $json = file_get_contents('php://input');
        
        // decoding the received JSON and store into $obj variable.
        $obj = json_decode($json,true);

        // Populate User email from JSON $obj array and store into $email.
        $email = $obj['email'];

        // Populate Password from JSON $obj array and store into $password.
        $senha = $obj['senha'];


        $sql= "SELECT email FROM conta WHERE email = '$email'";
        $sql = $con->prepare($sql);
        $sql->execute();
        
        $resultados= array();

        if($row = $sql->fetch(PDO::FETCH_ASSOC)){
            throw new Exception("e-mail ja cadastrado"); 
        }else{
                if($senha == "" || $senha == null){
                    throw new Exeption("campo senha deve ser preenchido"); 
                }else{
                  $query = "INSERT INTO conta (email,senha) VALUES ('$email','$senha')";
                  $sql = $con->prepare($query);
                  $sql->execute();
        
                  if($sql){
                    return"Usuario cadastrado com sucesso!";
                  }else{
                    return"nao foi possivel cadastrar o usuario :(";
                }
                }
              }
         }

         public function logar(){
            $con= new PDO('mysql: host=localhost; dbname=orgafin;','root', '');

        // Getting the received JSON into $json variable.
        $json = file_get_contents('php://input');
        
        // decoding the received JSON and store into $obj variable.
        $obj = json_decode($json,true);

        // Populate User email from JSON $obj array and store into $email.
        $email = $obj['email'];

        // Populate Password from JSON $obj array and store into $password.
        $senha = $obj['senha'];

            $sql= "SELECT * FROM conta WHERE email =
            '$email'";
            $sql = $con->prepare($sql);
            $sql->execute();
            
         
    
            if($row = $sql->fetch(PDO::FETCH_ASSOC)){
                $resultado= $row;
                $sql= "SELECT * FROM conta WHERE senha = '$senha'"; 
                $sql = $con->prepare($sql);
                $sql->execute();
                if($row = $sql->fetch(PDO::FETCH_ASSOC)){
                    return("Logado com sucesso");
                }else{
                    throw new Exception('senha errada'); 
                }
            }
            if(!$resultados){
                throw new Exception('nenhum usuario com esse e-mail cadastrado'); 
            }
           
            return $resultados;
         }
    }

?>