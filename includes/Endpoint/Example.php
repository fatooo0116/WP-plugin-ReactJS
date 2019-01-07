<?php
/**
 * WP-Reactivate
 *
 *
 * @package   WP-Reactivate
 * @author    Pangolin
 * @license   GPL-3.0
 * @link      https://gopangolin.com
 * @copyright 2017 Pangolin (Pty) Ltd
 */

namespace Pangolin\WPR\Endpoint;
use Pangolin\WPR;

/**
 * @subpackage REST_Controller
 */
class Example {
    /**
	 * Instance of this class.
	 *
	 * @since    0.8.1
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Initialize the plugin by setting localization and loading public scripts
	 * and styles.
	 *
	 * @since     0.8.1
	 */
	private function __construct() {
        $plugin = WPR\Plugin::get_instance();
		$this->plugin_slug = $plugin->get_plugin_slug();
	}

    /**
     * Set up WordPress hooks and filters
     *
     * @return void
     */
    public function do_hooks() {
        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
    }

	/**
	 * Return an instance of this class.
	 *
	 * @since     0.8.1
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
			self::$instance->do_hooks();
		}

		return self::$instance;
	}

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes() {
        $version = '1';
        $namespace = $this->plugin_slug . '/v' . $version;
        $endpoint = '/example/';

        register_rest_route( $namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array( $this, 'get_example' ),
                'permission_callback'   => array( $this, 'example_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

        register_rest_route( $namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array( $this, 'update_example' ),
                'permission_callback'   => array( $this, 'example_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

        register_rest_route( $namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::EDITABLE,
                'callback'              => array( $this, 'update_example' ),
                'permission_callback'   => array( $this, 'example_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

        register_rest_route( $namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::DELETABLE,
                'callback'              => array( $this, 'delete_example' ),
                'permission_callback'   => array( $this, 'example_permissions_check' ),
                'args'                  => array(),
            ),
        ) );


			//	$version2 = '1';
      //  $namespace2 = $this->plugin_slug . '/v' . $version2;
      //  $endpoint2 = '/myslider/';

				register_rest_route( $namespace, '/myslider/', array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array( $this, 'get_all_slider' ),
                'permission_callback'   => array( $this, 'example_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

				register_rest_route( $namespace, '/myslider/', array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array( $this, 'add_slider_box' ),
                'permission_callback'   => array( $this, 'example_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

				register_rest_route( $namespace, '/myslider/', array(
            array(
                'methods'               => \WP_REST_Server::DELETABLE,
                'callback'              => array( $this, 'del_slider_box' ),
                'permission_callback'   => array( $this, 'example_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

				register_rest_route( $namespace, '/myslider/', array(
            array(
                'methods'               => \WP_REST_Server::EDITABLE,
                'callback'              => array( $this, 'edit_slider_box_name' ),
                'permission_callback'   => array( $this, 'example_permissions_check' ),
                'args'                  => array(),
            ),
        ) );




				/*  Slide CRUD  */
				register_rest_route( $namespace, '/myslide/', array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array( $this, 'add_slide' ),
                'permission_callback'   => array( $this, 'example_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

				register_rest_route( $namespace, '/myslide/', array(
            array(
                'methods'               => \WP_REST_Server::DELETABLE,
                'callback'              => array( $this, 'del_slide' ),
                'permission_callback'   => array( $this, 'example_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

				register_rest_route( $namespace, '/myslide/', array(
						array(
								'methods'               => \WP_REST_Server::EDITABLE,
								'callback'              => array( $this, 'edit_slide' ),
								'permission_callback'   => array( $this, 'example_permissions_check' ),
								'args'                  => array(),
						),
				) );
    }


		public function edit_slide($req){

			global $wpdb;
			$my_table = $wpdb->prefix."SliderTool_slide";

			$slide = $req->get_param('slider');

			$result = $wpdb->update(
				$my_table,
				array(
					'title' => $slide['title'],
					'url' => $slide['url'],
					'descx' => $slide['descx'],	// string
				),
				array( 'id' => 	$slide['id'] )
			);

			return new \WP_REST_Response( array(
					'success' => $result,
					'value' =>  $slide
			), 200 );
		}


		public function del_slide($req){
			global $wpdb;
			$my_table = $wpdb->prefix."SliderTool_slide";

			$wpdb->delete( $my_table, array( 'id' => $req->get_param('slide') ));
			$my_table = $wpdb->prefix."SliderTool";
			$sql = "SELECT * FROM ".$my_table." order by id";
			$results = $wpdb->get_results($sql);


			foreach($results as $item){
					$my_table = $wpdb->prefix."SliderTool_slide";
					$sql = "SELECT * FROM ".$my_table." WHERE  slider=".$item->id;
					$results_slide = $wpdb->get_results($sql);
					$item->xslide = $results_slide;
			}


			return new \WP_REST_Response( array(
					'success' => true,
					'value' =>  $results
			), 200 );
		}





		public function edit_slider_box_name($req){
			global $wpdb;
			$my_table = $wpdb->prefix."SliderTool";

			$wpdb->update(
				$my_table,
				array(
					'name' => $req->get_param('name'),	// string
				),
				array( 'id' => $req->get_param('sboxid') )
			);


			$my_table = $wpdb->prefix."SliderTool";
			$sql = "SELECT * FROM ".$my_table." order by id";
			$results = $wpdb->get_results($sql);


			foreach($results as $item){
					$my_table = $wpdb->prefix."SliderTool_slide";
					$sql = "SELECT * FROM ".$my_table." WHERE  slider=".$item->id;
					$results_slide = $wpdb->get_results($sql);
					$item->xslide = $results_slide;
			}



			return new \WP_REST_Response( array(
					'success' => true,
					'value' =>  $results
			), 200 );
		}



		public function add_slide($req){
			global $wpdb;
			$my_table = $wpdb->prefix."SliderTool_slide";

			$data = array(
				'title' => 'Please Edit Slide',
				'slider'=> $req->get_param('slider')
			);
			$format = array('%s');
			$wpdb->insert($my_table,$data,$format);


			$my_table = $wpdb->prefix."SliderTool";
			$sql = "SELECT * FROM ".$my_table." order by id";
			$results = $wpdb->get_results($sql);


			foreach($results as $item){
					$my_table = $wpdb->prefix."SliderTool_slide";
					$sql = "SELECT * FROM ".$my_table." WHERE  slider=".$item->id;
					$results_slide = $wpdb->get_results($sql);
					$item->xslide = $results_slide;
			}


			return new \WP_REST_Response( array(
					'success' => true,
					'value' =>  $results
			), 200 );
		}



		public function del_slider_box($req){

			global $wpdb;
			$my_table = $wpdb->prefix."SliderTool";
			$wpdb->delete( $my_table, array( 'id' => $req->get_param('datakey') ));

			$slide_table = $wpdb->prefix."SliderTool_slide";
			$sql = "DELETE FROM ".$slide_table." WHERE slider=".$req->get_param('datakey');
			$wpdb->get_results( $sql );



			$sql = "SELECT * FROM ".$my_table." order by id";
			$results = $wpdb->get_results($sql);

			foreach($results as $item){
					$my_table = $wpdb->prefix."SliderTool_slide";
					$sql = "SELECT * FROM ".$my_table." WHERE  slider=".$item->id;
					$results_slide = $wpdb->get_results($sql);

					$item->xslide = $results_slide;
			}

			return new \WP_REST_Response( array(
					'success' => true,
					'value' =>  $results
			), 200 );
		}




		public function get_all_slider($req){

			global $wpdb;
			$my_table = $wpdb->prefix."SliderTool";
			$sql = "SELECT * FROM ".$my_table." order by id";
			$results = $wpdb->get_results($sql);

			foreach($results as $item){
					$my_table = $wpdb->prefix."SliderTool_slide";
					$sql = "SELECT * FROM ".$my_table." WHERE  slider=".$item->id;
					$results_slide = $wpdb->get_results($sql);

					$item->xslide = $results_slide;
			}
			// json_encode($results)

			return new \WP_REST_Response( array(
					'success' => true,
					'value' =>  $results
			), 200 );
		}


		public function add_slider_box($req){

			global $wpdb;
			$my_table = $wpdb->prefix."SliderTool";

			$data = array('name' => $req->get_param('name'));
			$format = array('%s');
			$wpdb->insert($my_table,$data,$format);

			$sql = "SELECT * FROM ".$my_table." order by id";
			$results = $wpdb->get_results($sql);

			foreach($results as $item){
					$my_table = $wpdb->prefix."SliderTool_slide";
					$sql = "SELECT * FROM ".$my_table." WHERE  slider=".$item->id;
					$results_slide = $wpdb->get_results($sql);

					$item->xslide = $results_slide;
			}


			return new \WP_REST_Response( array(
					'success' => true,
					'value' =>  $results
			), 200 );
		}




    /**
     * Get Example
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_example( $request ) {
        $example_option = get_option( 'wpr_example_setting' );

        // Don't return false if there is no option
        if ( ! $example_option ) {
            return new \WP_REST_Response( array(
                'success' => true,
                'value' => ''
            ), 200 );
        }

        return new \WP_REST_Response( array(
            'success' => true,
            'value' => $example_option
        ), 200 );
    }

    /**
     * Create OR Update Example
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_example( $request ) {
        $updated = update_option( 'wpr_example_setting', $request->get_param( 'exampleSetting' ) );

        return new \WP_REST_Response( array(
            'success'   => $updated,
            'value'     => $request->get_param( 'exampleSetting' )
        ), 200 );
    }

    /**
     * Delete Example
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function delete_example( $request ) {
        $deleted = delete_option( 'wpr_example_setting' );

        return new \WP_REST_Response( array(
            'success'   => $deleted,
            'value'     => ''
        ), 200 );
    }

    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function example_permissions_check( $request ) {
        return current_user_can( 'manage_options' );
    }
}
