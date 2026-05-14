<?php
if (isset($_GET['utm_source']) || isset($_GET['utm_campaign'])) {
   $utm_source = filter_input(INPUT_GET, 'utm_source', FILTER_SANITIZE_STRING) ?? 'Web';
   $utm_campaign = filter_input(INPUT_GET, 'utm_campaign', FILTER_SANITIZE_STRING) ?? 'Default';
} else {
   $utm_source = 'Web';
   $utm_campaign = 'Default';
}
?>
<?php include '../extended/header.php'; ?>

<body class="home page-template-default page page-id-2039 gdlr-core-body woocommerce-no-js tribe-no-js kingster-body kingster-body-front kingster-full  kingster-with-sticky-navigation  kingster-blockquote-style-1 gdlr-core-link-to-lightbox">
   <?php include '../extended/menu_mobile.php'; ?>
   <div class="kingster-body-outer-wrapper ">
      <div class="kingster-body-wrapper clearfix  kingster-with-frame">
         <?php include '../extended/top_bar.php'; ?> <?php include '../extended/menu_home.php'; ?>
         <div class="kingster-page-title-wrap  kingster-style-custom kingster-left-align" style="background-image: url(../images/carreras/marketing.jpg) ;">
            <div class="kingster-header-transparent-substitute"></div>
            <div class="kingster-page-title-overlay"></div>
            <div class="kingster-page-title-bottom-gradient"></div>
            <div class="kingster-page-title-container kingster-container">
               <div class="kingster-page-title-content kingster-item-pdlr" style="padding-top: 200px ;padding-bottom: 80px ;">
                  <div class="kingster-page-caption">Modalidad en línea</div>
                  <h1 class="kingster-page-title" style="text-transform: none ;">Licenciatura en Marketing</h1>
               </div>
            </div>
         </div>
         <div class="kingster-page-wrapper" id="kingster-page-wrapper">
            <div class="gdlr-core-page-builder-body">
               <div class="gdlr-core-pbf-sidebar-wrapper " style="margin: 0px 0px 0px 0px;">
                  <div class="gdlr-core-pbf-sidebar-container gdlr-core-line-height-0 clearfix gdlr-core-js gdlr-core-container">
                     <div class="gdlr-core-pbf-sidebar-content  gdlr-core-column-40 gdlr-core-pbf-sidebar-padding gdlr-core-line-height gdlr-core-column-extend-left" style="padding: 35px 0px 20px 0px;">
                        <div class="gdlr-core-pbf-sidebar-content-inner" style="padding-top: 40px">
                           <div class="gdlr-core-pbf-element">
                              <div class="gdlr-core-title-item gdlr-core-item-pdb clearfix  gdlr-core-left-align gdlr-core-title-item-caption-top gdlr-core-item-pdlr" style="padding-bottom: 40px ;">
                                 <div class="gdlr-core-title-item-title-wrap clearfix">
                                    <h3 class="gdlr-core-title-item-title gdlr-core-skin-title " style="font-size: 30px ;font-weight: 600 ;letter-spacing: 0px ;text-transform: none ;color: #161616 ;margin-right: 30px ;">Descripci&oacute;n de la carrera</h3>
                                    <div class="gdlr-core-title-item-divider gdlr-core-right gdlr-core-skin-divider" style="font-size: 22px ;border-bottom-width: 3px ;"></div>
                                 </div>
                              </div>
                           </div>
                           <div class="gdlr-core-pbf-element">
                              <div class="gdlr-core-text-box-item gdlr-core-item-pdlr gdlr-core-item-pdb gdlr-core-left-align">
                                 <div class="gdlr-core-text-box-item-content" style="font-size: 16px ;text-transform: none ;">
                                    <p>La licenciatura en Marketing de la UEES está enfocada en formar futuros profesionales con el perfil adecuado para integrarse al ambiente empresarial, sea público, privado o sin fines de lucro, optando por cargos de mandos gerenciales con elementos que desarrollan el emprendimiento y dan iniciativas de actividades corporativas.</p>
                                 </div>
                              </div>
                           </div>
                           <div class=" gdlr-core-pbf-wrapper-container-inner gdlr-core-item-mglr clearfix">
                              <div class="gdlr-core-pbf-column gdlr-core-column-30 gdlr-core-column-first">
                                 <div class="gdlr-core-pbf-column-content-margin gdlr-core-js " style="padding: 10px 0px 0px 0px;">
                                    <div class="gdlr-core-pbf-background-wrap"></div>
                                    <div class="gdlr-core-pbf-column-content clearfix gdlr-core-js ">
                                       <div class="gdlr-core-pbf-element">
                                          <div class="gdlr-core-column-service-item gdlr-core-item-pdb  gdlr-core-left-align gdlr-core-column-service-icon-left gdlr-core-with-caption gdlr-core-item-pdlr" style="padding-bottom: 30px;">
                                             <div class="gdlr-core-column-service-media gdlr-core-media-image"><img class="lazy loaded" src="https://www.uees.edu.ec/wp-content/uploads/2021/06/icono-grado.png" data-src="https://www.uees.edu.ec/wp-content/uploads/2021/06/icono-grado.png" alt="" width="45" height="45" title="Grado" data-was-processed="true"></div>
                                             <div class="gdlr-core-column-service-content-wrapper">
                                                <div class="gdlr-core-column-service-title-wrap">
                                                   <h3 class="gdlr-core-column-service-title gdlr-core-skin-title" style="font-size: 18px ;font-weight: 600 ;text-transform: none ;color: #161616">Título a obtener</h3>
                                                   <div class="gdlr-core-column-service-caption gdlr-core-info-font gdlr-core-skin-caption" style="font-size: 15px ;font-weight: 500 ;font-style: normal ;">Licenciado en Marketing</div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="gdlr-core-pbf-column gdlr-core-column-30" id="gdlr-core-column-94849">
                                 <div class="gdlr-core-pbf-column-content-margin gdlr-core-js " style="margin: 0px 0px 0px 0px;padding: 10px 0px 0px 0px;">
                                    <div class="gdlr-core-pbf-background-wrap"></div>
                                    <div class="gdlr-core-pbf-column-content clearfix gdlr-core-js ">
                                       <div class="gdlr-core-pbf-element">
                                          <div class="gdlr-core-column-service-item gdlr-core-item-pdb  gdlr-core-left-align gdlr-core-column-service-icon-left gdlr-core-with-caption gdlr-core-item-pdlr" style="padding-bottom: 30px;">
                                             <div class="gdlr-core-column-service-media gdlr-core-media-image"><img class="lazy loaded" src="https://www.uees.edu.ec/wp-content/uploads/2021/07/icono-resolucion.png" data-src="https://www.uees.edu.ec/wp-content/uploads/2021/07/icono-resolucion.png" alt="" width="45" height="45" title="icono-resolucion" data-was-processed="true"></div>
                                             <div class="gdlr-core-column-service-content-wrapper">
                                                <div class="gdlr-core-column-service-title-wrap">
                                                   <h3 class="gdlr-core-column-service-title gdlr-core-skin-title" style="font-size: 18px ;font-weight: 600 ;text-transform: none ;color: #161616">Modalidad en línea</h3>
                                                   <div class="gdlr-core-column-service-caption gdlr-core-info-font gdlr-core-skin-caption" style="font-size: 15px ;font-weight: 500 ;font-style: normal ;">RPC-SO-28-No.451-2018<br>RPC-SO-03-No.077-2021</div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <?php include 'banner_equivalencias.php' ?>
                        </div>
                     </div>
                     <div class="gdlr-core-pbf-sidebar-right gdlr-core-column-extend-right  kingster-sidebar-area gdlr-core-column-20 gdlr-core-pbf-sidebar-padding  gdlr-core-line-height" style="padding: 50px 0px 0px 0px;" id="formulario_pagina_web">
                        <div class="gdlr-core-sidebar-item gdlr-core-item-pdlr">
                           <div id="text-23" class="widget widget_text kingster-widget">
                              <div class="textwidget" style="box-shadow: 0 -6px 24px rgba(10, 10, 10,0.09); -moz-box-shadow: 0 -6px 24px rgba(10, 10, 10,0.09); -webkit-box-shadow: 0 -6px 24px rgba(10, 10, 10,0.09); background-color: #ffffff ;border-radius:  3px 3px ;-moz-border-radius:  3px 3px ;-webkit-border-radius:  3px 3px ;">
                                 <div class="gdlr-core-widget-box-shortcode " style="color: #821436 ;padding: 25px 5px;background-color: #ffffff ;">
                                    <div class="gdlr-core-widget-box-shortcode-content">
                                       <div class="gdlr-core-pbf-element">
                                          <div class="gdlr-core-title-item gdlr-core-item-pdb clearfix  gdlr-core-left-align gdlr-core-title-item-caption-top gdlr-core-item-pdlr" style="padding-bottom: 15px ;">
                                             <div class="gdlr-core-title-item-title-wrap clearfix">
                                                <h3 class="gdlr-core-title-item-title gdlr-core-skin-title " style="font-size: 24px ;font-weight: 600 ;letter-spacing: 0px ;text-transform: none ;color: #1a1a1a ;">Reciba más información</h3>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="gdlr-core-pbf-element">
                                          <iframe src="https://webservices.uees.edu.ec/formularios/formulario-web-grado.php?carrera=Marketing&utm_source=&utm_campaign=" style="height:900px;width:100%;border:none;" title="Formulario Web" id="form-params-dinamic"></iframe>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="gdlr-core-pbf-wrapper " style="padding: 0px 0px 0px 0px;">
               <div class="gdlr-core-pbf-background-wrap" style="background-color: #f2f2f2 ;"></div>
               <div class="gdlr-core-pbf-wrapper-content gdlr-core-js ">
                  <div class="gdlr-core-pbf-wrapper-container clearfix gdlr-core-container">
                     <div class="gdlr-core-pbf-column gdlr-core-column-30 gdlr-core-column-first" id="gdlr-core-column-8638">
                        <div class="gdlr-core-pbf-column-content-margin gdlr-core-js  gdlr-core-column-extend-left" data-sync-height="height-2" style="height: 860.461px;">
                           <div class="gdlr-core-pbf-background-wrap">
                              <div class="gdlr-core-pbf-background gdlr-core-parallax gdlr-core-js" style="background-image: url(https://www.uees.edu.ec/wp-content/uploads/2021/07/donde1-9.jpg); background-size: cover; background-position: center center; height: 875.969px; transform: translate(0px, -43.5328px);" data-parallax-speed="0.2"></div>
                           </div>
                           <div class="gdlr-core-pbf-column-content clearfix gdlr-core-js  gdlr-core-sync-height-content"></div>
                        </div>
                     </div>
                     <div class="gdlr-core-pbf-column gdlr-core-column-30">
                        <div class="gdlr-core-pbf-column-content-margin gdlr-core-js " style="padding: 100px 0px 50px 50px; height: 860.461px;" data-sync-height="height-2" data-sync-height-center="">
                           <div class="gdlr-core-pbf-background-wrap" style="background-color: #f2f2f2 ;"></div>
                           <div class="gdlr-core-pbf-column-content clearfix gdlr-core-js  gdlr-core-sync-height-content">
                              <div class="gdlr-core-pbf-element">
                                 <div class="gdlr-core-title-item gdlr-core-item-pdb clearfix  gdlr-core-left-align gdlr-core-title-item-caption-bottom gdlr-core-item-pdlr" style="padding-bottom: 25px ;">
                                    <div class="gdlr-core-title-item-title-wrap clearfix">
                                       <h3 class="gdlr-core-title-item-title gdlr-core-skin-title " style="font-size: 30px ;font-weight: 600 ;letter-spacing: 0px ;text-transform: none ;">Competencias y Habilidades</h3>
                                    </div>
                                 </div>
                              </div>
                              <div class="gdlr-core-pbf-element">
                                 <div class="gdlr-core-text-box-item gdlr-core-item-pdlr gdlr-core-item-pdb gdlr-core-left-align">
                                    <div class="gdlr-core-text-box-item-content" style="font-size: 17px ;text-transform: none ;">
                                       <ul>
                                          <li class=" gdlr-core-skin-divider clearfix">
                                             <div class="gdlr-core-icon-list-content-wrap">
                                                <span class="gdlr-core-icon-list-content" style="font-size: 16px;text-align: justify;">Pensamiento estratégico orientado a los segmentos que atiende la empresa.</span>
                                             </div>
                                          </li>
                                          <li class=" gdlr-core-skin-divider clearfix">
                                             <div class="gdlr-core-icon-list-content-wrap">
                                                <span class="gdlr-core-icon-list-content" style="font-size: 16px;text-align: justify;">Comprensión completa de la educación para entender el impacto de las soluciones de su carrera
                                                   profesional en el contexto global, económico, social, tecnológico y ambiental.</span>
                                             </div>
                                          </li>
                                          <li class=" gdlr-core-skin-divider clearfix">
                                             <div class="gdlr-core-icon-list-content-wrap">
                                                <span class="gdlr-core-icon-list-content" style="font-size: 16px;text-align: justify;">Analizar e interpretar las necesidades del cliente y aplicar los resultados en la optimización del proceso de
                                                   comunicación visual.</span>
                                             </div>
                                          </li>
                                          <li class=" gdlr-core-skin-divider clearfix">
                                             <div class="gdlr-core-icon-list-content-wrap">
                                                <span class="gdlr-core-icon-list-content" style="font-size: 16px;text-align: justify;">Destreza para aplicar conocimientos, técnicas, habilidades y herramientas actualizadas en las
                                                   comunicaciones intetradas de Marketing (CIM).
                                                </span>
                                             </div>
                                          </li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="gdlr-core-pbf-wrapper " style="padding: 0px 0px 0px 0px;">
               <div class="gdlr-core-pbf-background-wrap" style="background-color: #f2f2f2 ;"></div>
               <div class="gdlr-core-pbf-wrapper-content gdlr-core-js ">
                  <div class="gdlr-core-pbf-wrapper-container clearfix gdlr-core-container">
                     <div class="gdlr-core-pbf-column gdlr-core-column-30 gdlr-core-column-first">
                        <div class="gdlr-core-pbf-column-content-margin gdlr-core-js " style="padding: 100px 40px 50px 10px; height: 653.976px;" data-sync-height="height-1" data-sync-height-center="">
                           <div class="gdlr-core-sync-height-pre-spaces" style="padding-top: 53.75px;"></div>
                           <div class="gdlr-core-pbf-background-wrap" style="background-color: #f2f2f2 ;"></div>
                           <div class="gdlr-core-pbf-column-content clearfix gdlr-core-js  gdlr-core-sync-height-content">
                              <div class="gdlr-core-pbf-element">
                                 <div class="gdlr-core-title-item gdlr-core-item-pdb clearfix  gdlr-core-left-align gdlr-core-title-item-caption-bottom gdlr-core-item-pdlr" style="padding-bottom: 25px ;">
                                    <div class="gdlr-core-title-item-title-wrap clearfix">
                                       <h3 class="gdlr-core-title-item-title gdlr-core-skin-title " style="font-size: 30px ;font-weight: 600 ;letter-spacing: 0px ;text-transform: none ;">Perfil de egreso</h3>
                                    </div>
                                 </div>
                              </div>
                              <div class="gdlr-core-pbf-element">
                                 <div class="gdlr-core-text-box-item gdlr-core-item-pdlr gdlr-core-item-pdb gdlr-core-left-align">
                                    <div class="gdlr-core-text-box-item-content" style="font-size: 17px ;text-transform: none ;">
                                       <ul>
                                          <li class=" gdlr-core-skin-divider clearfix">
                                             <div class="gdlr-core-icon-list-content-wrap">
                                                <span class="gdlr-core-icon-list-content" style="font-size: 16px;text-align: justify;">Diseñar estrategias de Marketing centradas en los clientes.</span>
                                             </div>
                                          </li>
                                          <li class=" gdlr-core-skin-divider clearfix">
                                             <div class="gdlr-core-icon-list-content-wrap">
                                                <span class="gdlr-core-icon-list-content" style="font-size: 16px;text-align: justify;">Manejar los procesos efectivos de promoción, comercialización, así como ventas de bienes y servicios
                                                   de cualquier empresa.</span>
                                             </div>
                                          </li>
                                          <li class=" gdlr-core-skin-divider clearfix">
                                             <div class="gdlr-core-icon-list-content-wrap">
                                                <span class="gdlr-core-icon-list-content" style="font-size: 16px;text-align: justify;">Dirigir la comunicación institucional, su impacto dentro y fuera de la organización.</span>
                                             </div>
                                          </li>
                                          <li class=" gdlr-core-skin-divider clearfix">
                                             <div class="gdlr-core-icon-list-content-wrap">
                                                <span class="gdlr-core-icon-list-content" style="font-size: 16px;text-align: justify;">Identicar características valoradas en los mercados para el desarrollo de nuevos productos o
                                                   introducción de mejoras en productos o servicios existentes, tanto locales como internacionales.</span>
                                             </div>
                                          </li>
                                          <li class=" gdlr-core-skin-divider clearfix">
                                             <div class="gdlr-core-icon-list-content-wrap">
                                                <span class="gdlr-core-icon-list-content" style="font-size: 16px;text-align: justify;">Gestionar sus propios proyectos de marketing como asesor y consultor dentro de cualquier
                                                   organización.</span>
                                             </div>
                                          </li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="gdlr-core-pbf-column gdlr-core-column-30" id="gdlr-core-column-36639">
                        <div class="gdlr-core-pbf-column-content-margin gdlr-core-js  gdlr-core-column-extend-right" data-sync-height="height-1" style="height: 653.976px;">
                           <div class="gdlr-core-pbf-background-wrap">
                              <div class="gdlr-core-pbf-background gdlr-core-parallax gdlr-core-js" style="background-image: url(../images/carreras/marketing-02.jpg); background-size: cover; background-position: center center; height: 710.762px; transform: translate(0px, -35.625px);" data-parallax-speed="0.2"></div>
                           </div>
                           <div class="gdlr-core-pbf-column-content clearfix gdlr-core-js  gdlr-core-sync-height-content"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <?php include 'section_metodologia.php' ?>
            <?php include 'section_financiamiento.php' ?>
            <div class="gdlr-core-pbf-wrapper" style="padding: 30px 0px 15px;">
               <div class="gdlr-core-pbf-wrapper-content gdlr-core-js ">
                  <div class="gdlr-core-pbf-wrapper-container clearfix gdlr-core-container">
                     <div class="gdlr-core-pbf-element">
                        <div class="gdlr-core-title-item gdlr-core-item-pdb clearfix  gdlr-core-left-align gdlr-core-title-item-caption-top gdlr-core-item-pdlr" style="padding-bottom: 40px ;">
                           <div class="gdlr-core-title-item-title-wrap clearfix">
                              <h3 class="gdlr-core-title-item-title gdlr-core-skin-title " style="font-size: 30px ;font-weight: 600 ;letter-spacing: 0px ;text-transform: none ;color: #161616 ;margin-right: 30px ;">Requisitos</h3>
                              <div class="gdlr-core-title-item-divider gdlr-core-right gdlr-core-skin-divider" style="font-size: 22px ;border-bottom-width: 3px ;"></div>
                           </div>
                        </div>
                     </div>
                     <div class="gdlr-core-pbf-element">
                        <div class="gdlr-core-text-box-item gdlr-core-item-pdlr gdlr-core-item-pdb gdlr-core-left-align" style="padding-bottom: 15px ;">
                           <div class="gdlr-core-text-box-item-content" style="font-size: 16px ;text-transform: none ;color: #6b6b6b ;">
                              <p><strong>Carreras completas de 4 años de estudios: </strong></p>
                              <p>El proceso de registro a la carrera es 100% en línea para lo cual debes llenar el formulario web y adjuntar los siguientes documentos (en formato pdf), que son requisito indispensable para ingresar a estudiar la carrera seleccionada:</p>
                              <ul>
                                 <li>Copia de la Cédula de Identidad.</li>
                                 <li>Copia de título de Bachiller.</li>
                                 <li>Copia del certificado del registro de titulo de Bachiller (Documento que se imprime de la página del Ministerio de Educación) <a href="http://servicios.educacion.gob.ec/titulacion25-web/faces/paginas/consulta-titulos-refrendados.xhtml" target="_blank">http://servicios.educacion.gob.ec/titulacion25-web/faces/paginas/consulta-titulos-refrendados.xhtml</a></li>
                                 <li>Foto tamaño carné</li>
                              </ul>
                              <p><strong>Validaci&oacute;n 2 años de estudios :</strong></p>
                              <ul>
                                 <li style="font-weight: 600;font-size: 18px"><a href="../programas-validaciones.php">Ver Requisitos <i class="gdlr-core-pos-right arrow_right" style="font-size: 21px ;color: #444444 ;"></i></a></li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div class="gdlr-core-pbf-wrapper" style="padding: 30px 0px 60px;">
               <div class="gdlr-core-pbf-wrapper-content gdlr-core-js ">
                  <div class="gdlr-core-pbf-wrapper-container clearfix gdlr-core-container">
                     <div class="gdlr-core-pbf-element">
                        <div class="gdlr-core-title-item gdlr-core-item-pdb clearfix  gdlr-core-left-align gdlr-core-title-item-caption-top gdlr-core-item-pdlr" style="padding-bottom: 40px ;">
                           <div class="gdlr-core-title-item-title-wrap clearfix">
                              <h3 class="gdlr-core-title-item-title gdlr-core-skin-title " style="font-size: 30px ;font-weight: 600 ;letter-spacing: 0px ;text-transform: none ;color: #161616 ;margin-right: 30px ;">Descargar Malla Curricular</h3>
                              <div class="gdlr-core-title-item-divider gdlr-core-right gdlr-core-skin-divider" style="font-size: 22px ;border-bottom-width: 3px ;"></div>
                           </div>
                        </div>
                     </div>
                     <div class="gdlr-core-pbf-column gdlr-core-column-20 gdlr-core-column-first">
                        <div class="gdlr-core-pbf-column-content-margin gdlr-core-js ">
                           <div class="gdlr-core-pbf-column-content clearfix gdlr-core-js ">
                              <div class="gdlr-core-pbf-element">
                                 <div class="gdlr-core-button-item gdlr-core-item-pdlr gdlr-core-item-pdb gdlr-core-left-align" style="padding-bottom: 10px ;"><a class="gdlr-core-button  gdlr-core-button-solid gdlr-core-left-align gdlr-core-button-no-border" href="https://online.uees.edu.ec/grado/mallas/MARKETING.pdf" target="_blank" style="padding: 10px 30px 10px 30px;border-radius: 3px;-moz-border-radius: 3px;-webkit-border-radius: 3px;"><span class="gdlr-core-content">Malla Curricular</span><i class="gdlr-core-pos-right fa fa-file-pdf-o"></i></a></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
         <?php include './whatsapp_flotante.php' ?>
      </div>
      <?php include '../extended/footer.php' ?>
   </div>
   </div> <?php include '../extended/footer_scripts.php'; ?>
</body>

</html>