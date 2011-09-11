<?php
/*
Plugin Name: Distraction Free Vim
Plugin URI: https://github.com/aaronjorbin/wp_distraction_free_vim
Description: This is not just a plugin, it symbolizes the hope and enthusiasm of an entire generation summed up in a few magical key bindings
Version: 0.1
Author URI: http://aaron.jorb.in
*/
class Jorbin_Dfv{

    function __construct()
    {
        add_action( 'load-post-new.php', array( $this , 'add_script' ) );
        add_action( 'load-post.php', array( $this , 'add_script' ) );
    }

    function add_script()
    {
        wp_enqueue_script( 'distractionFreeVim', plugins_url('/dfv.js', __FILE__), array( 'wp-fullscreen' , ));
    }

}

new Jorbin_DFV();
