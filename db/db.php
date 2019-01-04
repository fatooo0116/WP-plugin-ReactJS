<?php
function slider_tool_db() {
  global $wpdb;
  $charset_collate = $wpdb->get_charset_collate();
  require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );


  $table_name = $wpdb->prefix . 'SliderTool';
  $sql = "CREATE TABLE $table_name (
    id int(9) NOT NULL AUTO_INCREMENT,
    name varchar(150) NOT NULL,
    UNIQUE KEY id (id)
  ) $charset_collate;";
  dbDelta( $sql );

  $table_name = $wpdb->prefix . 'SliderTool_slide';
  $sql = "CREATE TABLE $table_name (
    id int(9) NOT NULL AUTO_INCREMENT,
    title varchar(150) NOT NULL,
    url varchar(200) NOT NULL,
    descx varchar(250) NOT NULL,
    slider int(15) NOT NULL,
    UNIQUE KEY id (id)
  ) $charset_collate;";
  dbDelta( $sql );


}
