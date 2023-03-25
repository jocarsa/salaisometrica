<?php
$db = new SQLite3('world.sqlite3');
if($_GET['o'] == "read"){
	$results = $db->query('DELETE FROM user WHERE epoch < '.(date('U')-60).'');
    $results = $db->query('SELECT * FROM user');
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $jsonArray[] = $row;
    }
    echo json_encode($jsonArray);
}
if($_GET['o'] == "write"){
    $results = $db->query('SELECT * FROM user WHERE name="'.$_GET['name'].'"');
    if ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $results = $db->query('
        UPDATE user 
        SET 
        px="'.$_GET['px'].'",
        py="'.$_GET['py'].'",
		rz = "'.$_GET['a'].'",
        speech="'.$_GET['speech'].'",
		epoch="'.date('U').'"
        WHERE name="'.$_GET['name'].'"
        ');
    }else{
        $results = $db->query('
        INSERT INTO user 
        VALUES
        (NULL,
        "'.$_GET['name'].'",
        "'.$_GET['px'].'",
        "'.$_GET['py'].'",
        "",
        "",
        "",
		""
        )
        ');
    }
    
}
?>