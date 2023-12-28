<?php 
// MetasController.php
 
class MetasController
{
    protected $metaTags = [];
    protected $cssLinks = [];
    protected $jsScripts = [];
    private static $instance;
 

    public function __construct()
    {
        
         $this->initializeConfig();

    }

    public static function getInstanceCount()
    {
        return self::$instanceCount;
    }
    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function initializeConfig()
    {
         // Configuraciones generales
        $this->setMetaTags(['title' => '']);
        //Define los CSS que serán comunes en todas las vistas
        $this->setCssLinks([
            '/public/vendor/bootstrap/css/bootstrap.min.css',
            '/public/css/common.css',
            '/public/vendor/sweetalert2/sweetalert2.min.css',
            '/public/vendor/sweetalert2/sweetTheme.css'
        ]);
        //Define los JS que serán comunes en todas las vistas
        $this->setJsScripts([
            '/public/vendor/jquery/jquery.min.js',
            '/public/vendor/bootstrap/js/bootstrap.bundle.js',
            '/public/js/utils/utils.js',
            '/public/js/utils/alertToast.js',
            '/public/vendor/sweetalert2/sweetalert2.all.min.js',
            '/public/js/app/auth/AuthLogout.js',
        ]);
    }

    public function setMetaTags($metaTags)
    { 	 
        $this->metaTags = array_merge($this->metaTags, $metaTags);
        
        
    }

    public function setCssLinks($cssLinks)
    {
        $this->cssLinks = array_merge($this->cssLinks, $cssLinks);
    }

    public function setJsScripts($jsScripts)
    {
        $this->jsScripts = array_merge($this->jsScripts, $jsScripts);
    }

    public function getMetaTag($tagName)
    {
         
        return isset($this->metaTags[$tagName]) ? $this->metaTags[$tagName] : '';
    }

    public function getCssLinks()
    {
        return $this->cssLinks;
    }

    public function getJsScripts()
    {
        return $this->jsScripts;
    }
}
