import { CertificateQRCode } from "@/components/CertificateQRCode";

const DEFAULT_GUID = "1c2d778c-8b39-4670-9f7b-a430422d90f3";

export async function generateStaticParams() {
  return [{ guid: DEFAULT_GUID }];
}

const html = `
  
    <div ng-app="birth" class="ng-scope">
      <!-- uiView: --><ui-view class="ng-scope"
        ><br-root
          pre-window-dressing="::$resolve.preWindowDressing"
          pre-birth-options="::$resolve.preBirthOptions"
          pre-ref="::$resolve.preRef"
          class="ng-scope ng-isolate-scope"
        >
          <style
            type="text/css"
            window-dressing="$ctrl.win_dress"
            class="ng-binding ng-isolate-scope"
          >
            body {
              font-family: Verdana, Arial, sans-serif;
              font-size: 8pt;
              background-color: #eaecee;
              margin: 0px;
              cursor: default;
            }

            /*
  table {
      TODO - find where/when to put this: margin: 0.5em 1em;
  }
  */

            button,
            input[type="button"],
            .button {
              font-weight: bold;
              text-align: center;
              text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.7);
              color: #4f4f4f;
              background: #e7e7e7;
              background: #c4c4c4
                linear-gradient(
                  top,
                  rgba(255, 255, 255, 0.8),
                  rgba(255, 255, 255, 0)
                );
              background: #c4c4c4 -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.8)), to(rgba(255, 255, 255, 0)));
              background: #c4c4c4 -moz-linear-gradient(top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));

              padding: 0.2em 0.5em;
              border: 1px solid #a8a8a8;
              border-radius: 3px;
              box-shadow: inset 0px 1px 0px #fff;
              margin: 0.25em 0.75em;
              /* display: block; */
            }

            /* window dressing header/footer styles */
            .hdr_ftr_colors,
            .hdr_ftr_colors a {
              background-color: #9ba87a;
              color: white;
            }

            /* heading styles */
            h1,
            h2,
            h3,
            h4 {
              font-family: Verdana, Arial, sans-serif;
              color: #003464;
              margin: 0.67em 2px 0.67em 2px;
            }

            h1 {
              font-size: 14pt;
            }

            h2 {
              font-size: 12pt;
            }

            h3 {
              font-size: 10pt;
            }

            .symbol {
              font: 1.5em "Georgia", "Apple Symbols", serif;
              vertical-align: middle;
            }

            /** prev/next search table buttons when disabled */
            .button .disabled {
              color: #cfcfcf;
            }

            /* backdrop for "modal dialog" type activity */
            div.s-modal-bg {
              z-index: 500;
              background-color: rgba(68, 68, 68, 0.75);
              padding: 3em 10em 3em 10em;
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
            }

            /* curtain over the main screen while long-running, must complete, I/O is active */
            div.s-io-throbber {
              z-index: 9000;
              background-color: rgba(68, 68, 68, 0.5);
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
            }

            /* the spinner / throbber displayed while the I/O is running */
            div.s-io-throbber > div {
              border: 16px solid #f3f3f3;
              border-radius: 50%;
              border-top: 16px solid #3498db;
              width: 60px;
              height: 60px;
              -webkit-animation: spin 2s linear infinite;
              animation: spin 1.25s linear infinite;
              margin: 0 auto;
              z-index: +1;
            }
            @-webkit-keyframes spin {
              0% {
                -webkit-transform: rotate(0deg);
              }
              100% {
                -webkit-transform: rotate(360deg);
              }
            }
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            /* text displayed while waiting */
            div.s-io-throbber > p {
              text-align: center;
              font-size: 20pt;
              padding: 3em;
            }

            /* TRANSIENT (but "important") background color for elements indicating that they are busy (pending I/O, etc) */
            .s-busy * {
              background-color: lightgrey !important ;
            }

            /* top level menu items */
            .s-menu span {
              width: 21em;
            }

            /* second level menu list (outer container) */
            .s-menu div {
              position: absolute;
              z-index: 250;
            }

            /* second level menu list */
            .s-menu ul {
              display: block;
              margin: 0.25em;
              padding-left: 1em;
              /*
      position: relative;
      left: -3em;
      top: 1em;
      */
            }

            /* second level menu items */
            .s-menu ul li {
              display: inherit;
            }

            .s-menu span,
            .s-menu ul li {
              padding: 3px;
            }

            /*
   * Disabled menu option styling:
   * Use very specific selector path to override "hover" selector
   */
            .s-menu div ul li.s-disabled {
              color: #dddddd;
              background: #555555;
              font-style: italic;
              text-shadow: none;
            }

            ul.s-tab {
              position: fixed;
              left: 0;
              right: 1em;
              bottom: 0;
              margin-top: 0em;
              margin-bottom: 0em;
            }

            ul.s-tab li {
              border: 1px solid #000;
              /* border-bottom-width: 0; */
              border-radius: 3px;
              margin: 3px 3px 3px 3px;
              padding: 5px 5px 5px 5px;
              display: inline;
            }

            /* active selections */
            .s-active,
            h3.s-fold,
            ul.s-tab li,
            .s-menu li:hover {
              text-shadow: 1px 3px 0px rgba(255, 255, 255, 0.5);
              background: #85b2cb;
              background: #85b2cb
                linear-gradient(
                  top,
                  rgba(255, 255, 255, 0),
                  rgba(255, 255, 255, 0.4)
                );
              background: #85b2cb -moz-linear-gradient(top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4));
              background: #85b2cb -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), to(rgba(255, 255, 255, 0.4)));
            }
            h3.s-fold,
            ul.s-tab li {
              font-size: 1em;
              font-weight: bold;
              color: #1c4257;
              margin-top: 1px;
              line-height: 2;
            }
            h3.s-fold {
              padding: 0.3em;
              /* border-radius: 2em 2em 0 0;*/
              margin: 0.5em 2px;
            }

            /* in-active selections */
            h3.s-inactive,
            ul.s-tab li.s-inactive {
              background: #c7c7c7;
            }
            /*
  h3.s-fold.s-inactive {
      border-radius: 2em;
      margin: 0.5em;
      font-weight: normal;
  }
  */
            /** active tab */
            ul.s-tab li {
              font-size: 1.3em;
            }

            /** inactive tab */
            ul.s-tab li.s-inactive {
              font-size: 1em;
            }

            /** completed, (active?) tab */
            .s-tab .s-complete {
              font-style: italic;
              background: #85cbb2;
              background: #85cbb2
                linear-gradient(
                  top,
                  rgba(255, 255, 255, 0),
                  rgba(255, 255, 255, 0.4)
                );
              background: #85cbb2 -moz-linear-gradient(top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4));
              background: #85cbb2 -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), to(rgba(255, 255, 255, 0.4)));
            }

            /** completed, inactive (color override) tab */
            .s-tab .s-complete.s-inactive {
              background: #c7d7c7;
            }

            /* basic white panel with an outline in which is "actual work" entry fields */
            div.s-workarea {
              font-family: Arial, sans-serif;
              font-size: 1.1em;
              color: #4f4f4f;
              background: #ffffff;
              padding: 0.2em;
              overflow: hidden; /* capture "floaters" */
            }

            /* page header area layout, such as "decedent header */
            /* TODO: revisit the display / sizing of this element - outer display??? */
            div.s-header fieldset {
              width: 98%;
              background-color: #f0f0f0;
              border-color: inherit;
            }

            div.s-workarea,
            fieldset,
            .s-workarea table {
              border: 1px solid #a8a8a8;
              border-radius: 3px;
              margin: 2px;
            }

            fieldset {
              display: block;
              vertical-align: top;
            }

            /* center dialogs (with alternate colored rows) that pop up over main form */
            div.s-modal-bg > div.s-workarea > table.s-datagrid {
              margin-left: auto;
              margin-right: auto;
            }

            /* nested fieldsets (field sub-groups) */
            div.s-workarea div fieldset fieldset {
              width: auto;
              margin-bottom: 0.5em;
            }

            /* prevent wrapped text in a label from impacting placement of next line (kicking next label to the right) */
            fieldset div {
              overflow: auto;
            }

            label {
              display: inline-block;
              float: left;
              width: 20em; /* TODO: tune per field block */
              vertical-align: top;
              text-align: right;
              margin-right: 0.75em;
            }

            label.s-cont {
              float: none;
              width: auto;
            }

            .s-required {
              color: #ea6464;
            }

            div.s-header fieldset label {
              width: auto;
              float: none;
              margin-left: 3em;
              margin-right: 2px;
            }

            div.s-header fieldset span {
              font-weight: bold;
            }

            fieldset input,
            fieldset select,
            fieldset textarea {
              margin-top: 1px;
              margin-bottom: 2px;
              vertical-align: top;
            }

            fieldset textarea {
              font-family: inherit;
              font-size: inherit;
              text-size-adjust: inherit;
            }

            /* highlight block, when applied */
            .s-highlight {
              background-color: #f7f7dd;
            }

            /* inline lookup data table (outer container) */
            [inline-lookup] input ~ div {
              position: absolute;
              z-index: 250;
            }

            .s-datagrid table,
            table.s-datagrid {
              font-size: 1.1em;
              color: #4f4f4f;
              background: #ffffff;
              border-width: 1px;
              border-style: solid;
              border-color: inherit;
              border-collapse: collapse;
            }

            .s-datagrid tr:nth-child(even) {
              background: none repeat scroll 0 0 #f2f5f9;
            }

            /* centering some items on "control" gray gradient area */
            .s-datagrid th,
            th.s-shaded,
            td.s-shaded,
            .s-shaded th,
            .s-shaded td {
              text-align: center;
              alignment: center;
            }

            /* create a gray gradient area for (some) controls to be placed */
            div.s-shaded,
            .s-datagrid th,
            th.s-shaded,
            td.s-shaded,
            .s-shaded th,
            .s-shaded td {
              padding: 0.4em 1em;
              border-width: 1px;
              border-style: solid;
              border-color: inherit;
              background: #cecece;
              background: #c4c4c4
                linear-gradient(
                  top,
                  rgba(255, 255, 255, 0.8),
                  rgba(255, 255, 255, 0)
                );
              background: #c4c4c4 -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.8)), to(rgba(255, 255, 255, 0)));
              background: #c4c4c4 -moz-linear-gradient(top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
            }

            .s-datagrid td {
              text-align: center;
              alignment: center;
              padding: 0.4em 1em;
              border-width: 1px;
              border-style: solid;
              border-color: inherit;
            }

            .s-entryform {
              font-size: 1.1em;
              border-collapse: collapse;
            }

            .s-entryform tbody {
              color: #4f4f4f;
              background: #ffffff;
              border: 1px solid #a8a8a8;
            }

            .s-entryform td {
              padding: 4px 10px;
              border-width: 1px;
              border-style: solid;
              border-color: inherit;
            }

            .s-entryform button {
              /* font-size: 1em; */
              font-weight: bold;
              color: #4f4f4f;
              text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.7);
              padding: 0.4em 1em;
              line-height: 1.4;
            }

            :disabled {
              font-weight: bold;
              color: #000;
              background-color: #f0f0f0;
            }

            /* error message layout */
            div.s-error,
            tr.s-error {
              color: #d8000c;
              background-color: #ffaaaa;
            }

            /* warning message layout */
            div.s-warn {
              color: #cc650b;
              background-color: #eeeca3;
            }

            /* info message layout */
            div.s-info {
              color: #009900;
              background-color: #dbffe0;
            }

            /* suggestion message layout */
            div.s-sugg {
              color: #3366cc;
              background-color: #33ccff;
            }

            div.s-error,
            div.s-warn,
            div.s-info,
            div.s-sugg {
              font-weight: bold;
              padding: 0.2em;
              border: 1px solid;
              border-radius: 3px;
              margin: 0.75em;
            }

            .s-error li,
            .s-warn li,
            .s-info li,
            .s-sugg li {
              list-style-type: none;
              text-indent: -2.5em;
              padding: 0.2em;
              margin-right: 3.5em;
            }
            .s-sugg .s-sugg-word {
              padding: 0.2em;
              margin-left: 0.2em;
              font-weight: bold;
            }
            /* transient message background bounding box */
            #tran_fld_msg > div > div {
              padding-right: 1em;
              margin: 0;
            }

            /* transient message text/foreground color (FYI: on top of transparent alpha setting) */
            #tran_fld_msg li {
              color: black;
            }

            /* decorate "clickables" like a link */
            .s-link {
              cursor: pointer;
              text-decoration: underline;
            }

            .ui-state-warning {
              border: 1px solid #9f6000;
              background-color: #feefb3;
            }

            .ui-state-error {
              background-color: #ffbaba;
            }

            input.s-error {
              border-color: #d8000c;
            }

            .s-error .s-inverse {
              color: #f7f7f7;
              background-color: #910a0a;
              border-width: 2px;
              border-style: solid;
              border-radius: 2px;
              border-color: #f7f7f7;
            }
          </style>
          <style type="text/css" class="ng-binding">
            div#fld_msg_modal {
              width: 500px;
              min-height: 80px;
              position: fixed;
              top: 20%;
              left: 45%;
              margin-top: -50px;
              margin-left: -150px;
              background-color: white;
              border-radius: 5px;
              text-align: center;
              z-index: 111; /* 1px higher than the overlay layer */
            }
            .s-header.VS_10D fieldset {
              background-color: rgba(71, 182, 242, 0.5);
            }
            .s-header.VS_12 fieldset {
              background-color: rgba(171, 124, 223, 0.5);
            }
            .modalclosebtn {
              margin: 5px 15px 5px 0;
              font-size: xx-large;
              color: red;
              font-weight: bold;
              float: right;
            }
            div#modal_overlay {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 110;
            }
            div#floating_hdr {
              z-index: 50;
              position: fixed;
              left: 0;
              width: 100%;
              background-color: #eaecee;
              top: 66px;
            }
            div#floating_hdr > div {
              padding: 0.25em;
              border-style: solid;
              border-radius: 0.25em;
              border-width: 0.25em;
              border-color: #9ba87a;
            }
            div#floating_spacer {
              height: 138px;
            }
            /* short (confirmation) form appearance */
            div.short-form {
              padding: 0.5em;
            }
            div.short-form p.short-form-emphasis {
              color: red;
              font-weight: bold;
            }
            /* TODO - tune settings fieldset widths for Windows chunky browser(s) */
            fieldset.settings {
              width: 28em;
              display: inline-block;
            }
            fieldset.settings label {
              width: 23em;
            }

            /* signature review (upload) column layout (fixed first column, fill the rest) */
            .sig-rvw-panes {
              width: 98%;
              margin: 0.5em;
              display: grid;
              grid-template-columns: 60em auto;
              justify-items: left;
              align-items: center;
              column-gap: 1em;
            }
            .sig-rvw-panes .sig-rvw-names {
              grid-row-start: 1;
              grid-column-start: 1;
            }
            .sig-rvw-panes .sig-rvw-img {
              grid-row-start: 1;
              grid-column-start: 2;
              width: 98%;
            }
            /* Squeeze in name labels to narrow the display beside the signature image/PDF. */
            .sig-rvw-names fieldset div label {
              width: 16em;
            }
            /** target name suffixes for reformat as separate line */
            .sig-rvw-names
              fieldset
              ng-transclude
              span[ng-show="is_suffix_required()"] {
              display: grid;
              grid-template-columns: 16em 6em;
              column-gap: 1em;
              align-items: center;
            }
            /** inline supplemental confirmation inserted above other material */
            .conf-above {
              margin-bottom: 2em;
            }
          </style>
          <!-- hide all other work behind a "curtain" when floating "modal" error messages are displayed -->
          <div
            id="modal_overlay"
            ng-show="$root.rt_ctl.are_tran_msgs()"
            tabindex="-10"
            class="ng-hide"
          ></div>
          <!-- ngIf: $root.rt_ctl.is_floater() -->
          <div
            id="floating_hdr"
            ng-if="$root.rt_ctl.is_floater()"
            class="ng-scope"
          >
            <div>
              <!-- ngIf: $root.rt_mod.settings.floating.menu -->
              <div
                id="top-menu"
                class="s-shaded s-menu ng-scope ng-isolate-scope"
                style="display: flex; display -webkit-flex;"
                ng-if="$root.rt_mod.settings.floating.menu"
                menu="$root.rt_mod.menu"
                handler="$root.rt_ctl.handle_menu_selection( action, name, url )"
                local-settings="$root.rt_ctl.local_settings()"
              >
                <!-- ngRepeat: top_menu in menu --><span
                  ng-repeat="top_menu in menu"
                  class="ng-scope"
                >
                  <span
                    id="CERTIFICATE_MENU"
                    ng-click="toggle_selection( top_menu)"
                    ng-class="selected_class( top_menu)"
                    class="ng-binding"
                  >
                    Certificates
                    <span class="symbol">▾</span>
                  </span>
                  <div
                    class="s-shaded ng-hide"
                    style="top: 97.0859375; left: 19.828125"
                    ng-show="is_menu_active( top_menu )"
                  >
                    <ul>
                      <!-- ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Find
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Create
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Save
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Edit Event Info
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Abandon Certificate
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Attest Certifier other than Attendant
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Print Scan &amp; Upload Signature Worksheet
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                    </ul>
                  </div> </span
                ><!-- end ngRepeat: top_menu in menu --><span
                  ng-repeat="top_menu in menu"
                  class="ng-scope"
                >
                  <span
                    id="VALIDATE_MENU"
                    ng-click="toggle_selection( top_menu)"
                    ng-class="selected_class( top_menu)"
                    class="ng-binding"
                  >
                    Validation
                    <span class="symbol">▾</span>
                  </span>
                  <div
                    class="s-shaded ng-hide"
                    style="top: 97.0859375; left: 19.828125"
                    ng-show="is_menu_active( top_menu )"
                  >
                    <ul>
                      <!-- ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Validate Public Use
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Validate Confidential Use
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Validate SSN Request
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Validate All
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                    </ul>
                  </div> </span
                ><!-- end ngRepeat: top_menu in menu --><span
                  ng-repeat="top_menu in menu"
                  class="ng-scope"
                >
                  <span
                    id="HELP_MENU"
                    ng-click="toggle_selection( top_menu)"
                    ng-class="selected_class( top_menu)"
                    class="ng-binding"
                  >
                    Help
                    <span class="symbol">▾</span>
                  </span>
                  <div
                    class="s-shaded ng-hide"
                    style="top: 97.0859375; left: 19.828125"
                    ng-show="is_menu_active( top_menu )"
                  >
                    <ul>
                      <!-- ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Contact Information
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        County Contacts
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        CAL IVRS Account Registration Form
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        CAL IVRS Account Modification Form
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        CAL IVRS Affidavit for Amendment
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope s-disabled"
                      >
                        --- Birth ---
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Worksheet Packet
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Hispanic/Race Worksheet
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Privacy Notification
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook - Intro
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook – BC
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook – Other Types
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook – Amendments
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook – Certified Copies
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook – Access
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook – Verification
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook - Fees
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook – Append A (Forms)
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook – Append B (Occupation)
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook – Append C (Industry)
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        EBRS User Guide – BC
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Online Pamphlets
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Birth Amendment Overview
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Out-of-Hospital Pamphlet
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope s-disabled"
                      >
                        --- Fetal Death ---
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Worksheet Packet
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Parent Race and Ethnicity Worksheet
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Privacy Notification
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook Intro
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook - FD
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook – Amendments
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Handbook – Disposition Permit Section
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        EBRS - FD USER GUIDE
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        Surrogate Fetal Death Registration
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                      <li
                        ng-repeat="sub_menu in top_menu.items"
                        ng-click="send_selection_event( sub_menu)"
                        ng-class="disabled_class( sub_menu )"
                        class="ng-binding ng-scope"
                      >
                        COD Help List
                      </li>
                      <!-- end ngRepeat: sub_menu in top_menu.items -->
                    </ul>
                  </div> </span
                ><!-- end ngRepeat: top_menu in menu -->
                <!-- ngIf: show_settings() --><span
                  style="width: 100%; padding: 0"
                  ng-if="show_settings()"
                  class="ng-scope"
                >
                  <span
                    style="float: right; width: auto"
                    ng-click="localSettings()"
                  >
                    <svg height="1.75em" width="1.75em">
                      <defs>
                        <clippath>
                          <path fill="#f2f2f2" d="m7 1023.36h1v1h-1z"></path>
                        </clippath>
                      </defs>
                      <path
                        d="m124.92 52.2c-.436-.571-1-.911-1.711-1.019l-14.909-2.281c-.815-2.607-1.929-5.268-3.341-7.984.977-1.358 2.443-3.272 4.398-5.744 1.955-2.472 3.34-4.277 4.155-5.418.435-.598.651-1.222.651-1.874 0-.76-.189-1.357-.57-1.792-1.955-2.771-6.436-7.387-13.443-13.851-.65-.543-1.33-.814-2.035-.814-.815 0-1.467.244-1.956.732l-11.568 8.718c-2.228-1.141-4.672-2.146-7.333-3.02l-2.281-14.99c-.054-.706-.367-1.29-.937-1.752-.571-.462-1.235-.692-1.997-.692h-18.09c-1.575 0-2.553.76-2.933 2.281-.706 2.715-1.494 7.766-2.363 15.15-2.553.816-5.02 1.848-7.414 3.097l-11.243-8.718c-.706-.543-1.412-.814-2.118-.814-1.195 0-3.761 1.941-7.699 5.825-3.938 3.884-6.612 6.803-8.03 8.758-.489.706-.733 1.331-.733 1.874 0 .652.271 1.304.814 1.955 3.639 4.4 6.545 8.147 8.718 11.244-1.358 2.498-2.417 4.997-3.177 7.495l-15.15 2.281c-.597.109-1.113.462-1.548 1.06-.435.597-.652 1.222-.652 1.873v18.09c0 .707.217 1.344.652 1.914.435.571 1 .912 1.711 1.02l14.91 2.2c.76 2.661 1.873 5.349 3.34 8.06-.977 1.358-2.444 3.272-4.399 5.744-1.955 2.472-3.341 4.277-4.155 5.418-.435.599-.652 1.222-.652 1.874 0 .706.19 1.33.57 1.873 2.118 2.934 6.599 7.497 13.443 13.688.598.598 1.277.896 2.037.896.815 0 1.494-.244 2.037-.732l11.488-8.719c2.228 1.141 4.672 2.146 7.333 3.02l2.281 14.99c.055.706.367 1.29.937 1.752.57.463 1.236.692 1.996.692h18.09c1.577 0 2.554-.76 2.935-2.281.705-2.716 1.492-7.766 2.361-15.15 2.553-.815 5.03-1.848 7.414-3.097l11.244 8.8c.76.488 1.467.732 2.118.732 1.194 0 3.747-1.927 7.657-5.784 3.912-3.856 6.6-6.79 8.06-8.8.489-.543.734-1.167.734-1.873 0-.706-.271-1.387-.815-2.037-3.91-4.78-6.816-8.527-8.718-11.243 1.086-2.01 2.146-4.481 3.178-7.414l15.07-2.28c.651-.109 1.196-.463 1.63-1.061.434-.598.65-1.223.65-1.874v-18.09c.0001-.706-.215-1.343-.651-1.914m-47.17 25.541c-4.073 4.074-8.989 6.111-14.747 6.111-5.758 0-10.673-2.037-14.747-6.111-4.073-4.073-6.11-8.988-6.11-14.746 0-5.758 2.036-10.673 6.11-14.747 4.074-4.073 8.99-6.11 14.747-6.11 5.758 0 10.674 2.037 14.747 6.11 4.073 4.074 6.11 8.989 6.11 14.747 0 5.758-2.037 10.673-6.11 14.746"
                        transform="matrix(.12786 0 0 .12786 2.949 2.956)"
                        fill="#4d4d4d"
                      ></path>
                    </svg>
                  </span> </span
                ><!-- end ngIf: show_settings() -->
              </div>
              <!-- end ngIf: $root.rt_mod.settings.floating.menu -->
              <!-- ngIf: $root.rt_mod.show_settings -->
              <!-- ngIf: $root.rt_ctl.is_float_name_status() -->
              <div ng-if="$root.rt_ctl.is_float_name_status()" class="ng-scope">
                <div class="s-header VS_10D">
                  <div ng-show="$ctrl.vm.cert.birthId">
                    <!-- DO NOT - will not update: ng-init="thisChild = $ctrl.vm.cert.personalInfo.thisChild" -->
                    <fieldset class="s-round-top">
                      <div style="float: left">
                        <label>1C. Last Name:</label>
                        <span class="ng-binding"> Test </span>
                        <label>1A. First Name:</label>
                        <span class="ng-binding"> Electronic sig </span>
                        <label
                          ng-show="$ctrl.vm.cert.personalInfo.thisChild.emrNumber"
                        >
                          MRN-NB:
                        </label>
                        <span
                          ng-show="$ctrl.vm.cert.personalInfo.thisChild.emrNumber"
                          class="ng-binding"
                        >
                          45345435
                        </span>
                      </div>
                      <div style="float: right">
                        <label>9C. Parent Giving Birth Last Name: </label>
                        <span class="ng-binding"> Gala </span>
                        <label>2. Sex:</label>
                        <span class="ng-binding"> MALE </span>
                        <label>Record:</label>
                        <span class="ng-binding"> 1006859 </span>
                      </div>
                    </fieldset>
                    <fieldset>
                      <table style="border: none; width: 100%">
                        <tbody>
                          <tr>
                            <td style="text-align: left">
                              <label class="ng-binding">3A. This Birth:</label>
                              <span class="ng-binding"> SINGLE </span>
                              <label class="ng-binding"
                                >3B. If Multiple, This Child:</label
                              >
                              <span class="ng-binding">
                                -
                                <span
                                  menu="$root.rt_mod.menu"
                                  action="LIST_LINKED"
                                  class="ng-isolate-scope"
                                >
                                  <!-- ngIf: ! actions --><span
                                    class="button ng-binding ng-scope ng-hide"
                                    ng-if="! actions"
                                    ng-show="label"
                                    ng-click="run_action()"
                                  >
                                  </span
                                  ><!-- end ngIf: ! actions -->
                                  <!-- ngRepeat: action in actions -->
                                </span>
                              </span>
                            </td>
                            <td style="text-align: center">
                              <span
                                style="font-size: 14pt; font-weight: bold"
                                class="ng-binding"
                                >Live Birth</span
                              >
                            </td>
                            <td style="text-align: right">
                              <label class="ng-binding"
                                >4A/4B. Date/Time of Birth:</label
                              >
                              <span class="ng-binding"> 09/05/2024 0900 </span>
                              <label>Status:</label>
                              <span class="ng-binding"> INC </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </fieldset>
                  </div>
                  <fieldset ng-show="$ctrl.vm.amend.type" class="ng-hide">
                    <div style="float: left">
                      <!-- TODO - mapping to option label for amendment type -->
                      <span class="ng-binding"> </span>
                      <span
                        ng-show="$root.rt_ctl.is_replacement_amend( $ctrl.vm.amend )"
                        class="ng-hide"
                      >
                        (Replacement)
                      </span>
                    </div>
                    <div style="float: right">
                      <label>Amendment:</label>
                      <span class="ng-binding"> </span>
                      <label>ID:</label>
                      <span class="ng-binding"> </span>
                      <label>Status:</label>
                      <span class="ng-binding"> </span>
                    </div>
                  </fieldset>
                  <fieldset ng-show="$ctrl.vm.amend_req.req_id" class="ng-hide">
                    <div style="float: left">
                      <label>1C. Last Name:</label>
                      <span id="hdr-1C" class="ng-binding"> </span>
                      <label>1A. First Name:</label>
                      <span id="hdr-1A" class="ng-binding"> </span>
                    </div>
                    <div id="hdr_req_id" style="float: right">
                      <label>Request ID:</label>
                      <span class="ng-binding"> </span>
                    </div>
                  </fieldset>
                </div>
              </div>
              <!-- end ngIf: $root.rt_ctl.is_float_name_status() -->
              <!-- ngIf: $root.rt_mod.settings.floating.msgs -->
            </div>
          </div>
          <!-- end ngIf: $root.rt_ctl.is_floater() -->
          <div
            class="hdr_ftr_colors ng-isolate-scope"
            style="padding: 5px"
            window-dressing="$ctrl.win_dress"
            timer="$ctrl.timer"
          >
            <table style="width: 100%">
              <tbody>
                <tr>
                  <!-- ngIf: timer -->
                  <td ng-if="timer" class="ng-scope">
                    <p class="ng-binding">16:24</p>
                    <!-- TODO - optionally re-enable logo with image link attribute 
                  <img src="' + root_link + '/images/applogo.jpg"/>
  -->
                  </td>
                  <!-- end ngIf: timer -->
                  <td style="width: 99%">
                    <div style="text-align: right; font-size: 14pt">
                      <span class="ng-binding"
                        >California Electronic Birth Registration System</span
                      >
                    </div>
                    <!-- ngIf: is_edrs() -->
                    <div
                      style="text-align: right; font-size: 10pt"
                      ng-if="is_edrs()"
                      class="ng-scope"
                    >
                      <span class="ng-binding">
                        Welcome, SUTTER CLERK |
                        <a
                          ng-href="http://localhost:8080/ca-admin/html/admin/admin.html#/profile/"
                          style="color: white"
                          href="http://localhost:8080/ca-admin/html/admin/admin.html#/profile/"
                          >Profile</a
                        >
                        |
                        <a
                          style="color: white"
                          ng-href="/ca-ebrs/logout"
                          href="http://localhost:8080/ca-ebrs/logout"
                        >
                          Logout
                        </a>
                      </span>
                    </div>
                    <!-- end ngIf: is_edrs() -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- ngIf: $root.rt_ctl.is_floater() -->
          <div
            id="floating_spacer"
            ng-if="$root.rt_ctl.is_floater()"
            class="ng-scope"
          >
            <p>This spaced reserved for floating header</p>
          </div>
          <!-- end ngIf: $root.rt_ctl.is_floater() -->
          <!-- ngIf: ! $root.rt_mod.settings.floating.menu -->
          <!-- ngIf: $root.rt_mod.show_settings && ( ! $root.rt_mod.settings.floating.menu ) -->
          <!-- ngIf: ! $root.rt_mod.settings.floating.msgs -->
        </br-root></ui-view
      >
    </div>
`;

export default function Home() {
  return (
    <div style={{ height: "100vh" }}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          width: "100%",
          height: "calc(100% - 202px)"
        }}
      >
        <h2>
          Please scan the QR code with your mobile device to E-Sign the
          certificate
        </h2>
        <CertificateQRCode guid={DEFAULT_GUID} />
      </div>
    </div>
  );
}
