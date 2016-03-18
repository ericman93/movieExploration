// Compiled using typings@0.6.10
// Source: https://cdn.zoomcharts-cloud.com/1/latest/netchart.d.ts
declare module ZoomCharts.Configuration {
    /* tslint:disable */

    export abstract class BaseApi {
        /** Adds the given data to whatever data the chart has currently loaded. The chart will automatically be updated
        to display this new data if it falls within the currently visible bounds. */
        public addData(data: BaseDataObjectBase, sourceId?: string): void;
        /** 
        @deprecated use settings.parentChart instead. */
        public addSubchartContainer(container: HTMLElement): void;
        public back(): BaseApi;
        public clearHistory(): BaseApi;
        /** Applies one of the built-in themes to the chart. This is an alternative to calling 
        `updateSettings({ theme: ZoomCharts.$this.themes.dark })`. */
        public customize(
            /** The name of the theme to be applied, must be one of the values defined in the `$this.themes` static property. */
            name: string): BaseApi;
        /** Launches a file download that contains an image or the data of the current state of the chart. 
        
        Note that in some browsers calling this method will send the data to a proxy. When handling sensitive data you should install the proxy 
        on your own server, see `advanced.exportProxyURL` setting. */
        public export(
            /** The format in which the data will be exported. */
            type: string, 
            /** Specifies the dimensions for the image formats. */
            dimensions?: BaseExportDimensions, 
            /** Specifies if the resulting image should have transparent background. This setting is only valid for `png` image format. Default is `false`.
            Note that if `area.style.fillColor` is set, this will have no effect. */
            transparent?: boolean): void;
        /** Saves the current chart state as a data-URI. 
        If image type is specified, the URI can be used as the image source in `<img src="">`. 
        Note that some output settings might require sending the data to a proxy. When handling sensitive data you should install the proxy 
        on your own server, see `advanced.exportProxyURL` setting. */
        public exportAsString(
            /** The format in which the data will be exported. */
            type: string, 
            /** The callback that will be invoked once the result is generated. */
            callback: (
                /** The data-uri that contains the generated image or data file. */
                dataUri: string, 
                /** The mime type of the generated file. */
                mimeType: string, 
                /** The extension of the generated file. */
                extension: string) => void, 
            /** Specifies the dimensions for the image formats. */
            dimensions?: BaseExportDimensions, 
            /** Specifies if the resulting image should have transparent background. This setting is only valid for `png` image format. Default is `false`.
            
            Note that if `area.style.fillColor` is set, this will have no effect. */
            transparent?: boolean): void;
        /** Returns the dimensions for the image exported with `exportImageAsString`.
        @deprecated use `exportImageGetDimensions` instead */
        public exportGetDimensions(dimensions: BaseExportDimensions): {
                width: number;
                height: number;
                scale: number;
                chartWidth: number;
                chartHeight: number;
            };
        /** Saves the current chart state as an image. 
        Note that this method does not support custom DPI setting, for that `exportAsString` method has to be used.
        @deprecated use `exportAsString` instead. */
        public exportImageAsString(type: string, dimensions: BaseExportDimensions, transparent: boolean): string;
        /** Returns the dimensions for the image exported with `exportImageAsString`. */
        public exportImageGetDimensions(dimensions: BaseExportDimensions): {
                width: number;
                height: number;
                scale: number;
                chartWidth: number;
                chartHeight: number;
            };
        public fullscreen(isFullscreen: boolean): boolean;
        public home(): boolean;
        /** Removes an event listener that was added by a call to `on` or by specifying it in settings.
        Note that the listener must be the exact same reference, which means that anonymous functions should not be used in call to `on`. */
        public off(
            /** the type of the event. Please see the documentation for `on` about valid values. */
            name: string, listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): boolean;
        /** Adds event listener. */
        public on(
            /** The type of the event for which the listener will be added. See method overloads for valid values. */
            name: string, 
            /** The callback function. It receives two arguments - the mouse event data and a separate object containing chart specific information. */
            listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for when the current view has changed (usually after panning and navigation). */
        public on(name: "chartUpdate", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for the mouse click (or touch tap) event. */
        public on(name: "click", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for the mouse double click (or touch double tap) event. */
        public on(name: "doubleClick", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for the mouse click (or touch tap) event. */
        public on(name: "error", listener: (
                /** An empty mouse event. */
                event: BaseMouseEvent, args: BaseChartErrorEventArguments) => void): void;
        /** Adds an event listener for when the currently hovered item has changed. */
        public on(name: "hoverChange", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for when chart placement on screen changes. Note that this is called on every animation frame. */
        public on(name: "positionChange", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for the mouse right click (or touch longpress) event. */
        public on(name: "rightClick", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for when the currently selected item or items have changed. */
        public on(name: "selectionChange", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for when the settings are updated through the API. */
        public on(name: "settingsChange", listener: (event: BaseMouseEvent, args: BaseChartSettingsChangeEventArguments) => void): void;
        /** Adds an event listener for the mouse triple click (or touch triple tap) event. */
        public on(name: "tripleClick", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Does immediate repaint. Use to sync updates between multiple charts. */
        public paintNow(force?: boolean): BaseApi;
        public profiler(): BaseProfiler;
        /** Clears data cache and loads new data. The current view is preserved. */
        public reloadData(sourceId?: string): void;
        /** Removes chart from DOM. Is automatically called when you create a new Chart with the same container. */
        public remove(): void;
        public removeData(data: BaseDataObjectBase, sourceId?: string): void;
        public replaceData(data: BaseDataObjectBase, sourceId?: string): void;
        /** Updates the chart settings but instead of merging some settings that are arrays or dictionaries (such as `data`)
        these collections are replaced completely. For example, this allows removal of series or value axis within TimeChart. */
        public replaceSettings(changes: BaseSettings): BaseApi;
        public restoreState(state: string, animate?: boolean): void;
        /** Decrements the suspend counter that was set using `suspendPaint()` method.
        
        This method also automatically schedules an async repaint. */
        public resumePaint(): void;
        /** Saves the current chart state as an image.
        @deprecated use `exportAsString` instead */
        public saveAsImage(type: string, dimensions: BaseExportDimensions, transparent: boolean): string;
        public saveState(): string;
        /** Suspends the animation of the chart until `resumePaint()` is called.
        
        This should be used when the chart element is hidden from the user to conserve browser resources.
        
        Note that if `suspendPaint()` is called multiple time then `resumePaint()` has to be called the same number of times. */
        public suspendPaint(): void;
        /** Gets the name of the chart the JavaScript object references. For example 'PieChart' or 'TimeChart'. This field is read-only. */
        public typeName: string;
        /** Re-evaluate data filters on next paint. */
        public updateFilters(): void;
        /** Updates the chart settings. Only the settings that have to be changed should be passed. Note that some arrays
        and dictionaries (such as `data`) are merged by the ID values - if instead they should be replaced, use
        [`replaceSettings()`](#doc_replaceSettings) method. */
        public updateSettings(changes: BaseSettings): BaseApi;
        /** Call when the container size has been changed to update the chart. */
        public updateSize(): BaseApi;
        /** Re-evaluate style for all objects on next paint. */
        public updateStyle(): void;
    }
    /** Describes the base properties shared between all events raised by the different charts. */
    export interface BaseChartErrorEventArguments extends BaseChartEventArguments {
        /** Any additional arguments that were passed to the error handler. */
        arg: any;
        /** The error message. */
        message: string;
    }
    /** Describes the base properties shared between all events raised by the different charts. */
    export interface BaseChartEventArguments {
        /** The chart object for which the event has been raised. */
        chart: BaseApi;
        origin: string;
    }
    /** Describes the base properties shared between all events raised by the different charts. */
    export interface BaseChartSettingsChangeEventArguments extends BaseChartEventArguments {
        changes?: BaseSettings;
    }
    export interface BaseDataErrorResponse extends BaseDataObjectBase {
        /** If the data could not be retrieved, this field can be used to instruct the chart to cancel the data request and log an error.
        Note that in most cases this field should not be used in favor of returning the correct HTTP status code (such as 404 or 500) so that
        the browser and any proxies do not cache the response. */
        error?: string;
    }
    export interface BaseDataObjectBase {
        /** Store any additional data values within this field. Although it is possible to extend the data object itself with additional fields 
        it is not recommended to do so because a future ZoomCharts version could introduce a known parameter with the same name thus changing the
        behavior of an existing chart. */
        extra?: any;
    }
    export interface BaseExportDimensions {
        /** Specifies the DPI setting used to calculate the pixel size if `unit` is specified as `mm`.
        Note that because of browser API limits the metadata of the resulting image will always specify `DPI=96` even
        though the pixel size will be calculated correctly. */
        dpi?: number;
        /** Specifies the width of the resulting image. If not given, the current width of the chart element
        is used instead.
        
        If the `width` is also specified but the aspect ratio is different from the chart, the image will be
        aligned in the top-left corner. */
        height?: number;
        /** Specifies a scale factor to the resulting image. A value of `2` will result in both the `width`
        and `height` being multiplied by `2`. */
        scaling?: number;
        /** Specifies the unit in which the `width` and `height` values are given. */
        unit?: string;
        /** Specifies the width of the resulting image. If not given, the current width of the chart element
        is used instead. 
        
        If the `height` is also specified but the aspect ratio is different from the chart, the image will be
        aligned in the top-left corner. */
        width?: number;
    }
    export interface BaseSettingsClassMap {
    }
    export interface BaseLabel {
        align: string;
        angle: number;
        aspectRatio: number;
        backgroundStyle: BaseSettingsBackgroundStyle;
        borderRadius: number;
        /** The bounds from where the label was last rendered. */
        currentBounds: BaseRect;
        hheight: number;
        hwidth: number;
        image: string;
        imageSlicing: [number, number, number, number];
        lineSpacing: number;
        margin: number;
        maxWidth: number;
        padding: number;
        reset(settings?: BaseSettingsLabelStyle, configMapping?: BaseSettingsClassMap, configPath?: string): void;
        text: string;
        textStyle: BaseSettingsTextStyle;
        visible: boolean;
    }
    /** Represents a single pointer. On multitouch, separate event for each pointer will be fired. */
    export interface BaseMouseEvent {
        altKey: boolean;
        changedPointerCount: number;
        consumed: boolean;
        ctrlKey: boolean;
        cursor: string;
        defaultPrevented: boolean;
        distance(p: {
                x: number;
                y: number;
            }): number;
        dx: number;
        dy: number;
        identifier: string;
        isRightMB: boolean;
        /** Verifies if the original event described by this instance is within a specified distance of the given position. */
        isWithinDistance(
            /** The mouse event/pointer to which this instance is compered */
            current: {
                pageX: number;
                pageY: number;
                timeStamp: number;
            }, 
            /** The distance, in pixels, non-inclusive, below which the method will return positive */
            dist: number, 
            /** Time, in milliseconds. If specified, also verifies that the original event did not occur too long ago. */
            maxAge?: number): boolean;
        pageX: number;
        pageY: number;
        pressed: boolean;
        preventDefault(): void;
        shiftKey: boolean;
        /** only on up event */
        swipeDown: boolean;
        /** only on up event */
        swipeLeft: boolean;
        /** only on up event */
        swipeRight: boolean;
        swipeSpeed: number;
        /** only on up event */
        swipeUp: boolean;
        target: HTMLElement;
        timeStamp: number;
        touch: boolean;
        vx: number;
        vy: number;
        wheelx: number;
        wheely: number;
        x: number;
        y: number;
    }
    export interface BaseProfiler {
        hasPendingRequests(): boolean;
        measureFps(measureFpsIters: number, measureFpsCallback: (fps: number, iterations: number, time: number) => void): boolean;
    }
    export interface BaseRect {
        addBounds(x0: number, y0: number, x1: number, y1: number): BaseRect;
        addLine(lineArray: Array<number>): BaseRect;
        addPoint(x: number, y: number): BaseRect;
        addRect(rect: BaseRect): BaseRect;
        area(): number;
        clip(rect: BaseRect): BaseRect;
        clone(): BaseRect;
        containsPoint(x: number, y: number): boolean;
        equals(b: BaseRect): boolean;
        h(): number;
        inflate(scale: number): BaseRect;
        intersectsSegment(x0: number, y0: number, x1: number, y1: number): boolean;
        isEmpty(): boolean;
        isInside(rect: BaseRect): boolean;
        isOutside(rect: BaseRect): boolean;
        moveBy(x: number, y: number): BaseRect;
        overlaps(bounds: BaseRect): boolean;
        overlapsRect(x0: number, y0: number, x1: number, y1: number): boolean;
        toString(): string;
        translate(txm: number, txa: number, tym: number, tya: number): BaseRect;
        w(): number;
        x0: number;
        x1: number;
        y0: number;
        y1: number;
    }
    export interface BaseSettings {
        advanced?: BaseSettingsAdvanced;
        /** Chart area related settings. */
        area?: BaseSettingsArea;
        /** The URL root where the ZoomCharts library and assets are located. For example, if the base.css file is available at
        'http://server/css/zoomcharts/zc.css' then this value should be set to 'http://server/css/zoomcharts/'.
        Note that the library will try to determine its location automatically by searching the included script tags.
        So this property can be skipped if the assets folder is located next to 'zoomcharts.js' file on the server. */
        assetsUrlBase?: string;
        /** Element of the page where the chart will be inserted. Any HTML element should work, for example you can use a `<div>`. 
        
        Any contents of the element will be cleared - this behavior can be used to specify a loading message as the initial content,
        for example `<div>Chart is being initialized...</div>`.
        
        Note that a single element can host only one chart. If the same container is given to another chart, the previous chart will
        be automatically disposed.
        Unless `parentChart` is specified, the value of the property is mandatory and can only be specified while creating the chart, 
        not with `updateSettings`. The value can be either an ID of an existing element or a reference to a DOM element. */
        container?: (string|HTMLElement);
        /** Settings for displaying chart credits. Use it as a reference to additional data sources if necessery.
        ![Chart including credits](images/settings-credits.png)
        Note that even if credits enabled on page load, it's possible to hide on exported images. */
        credits?: BaseSettingsCredits;
        /** Settings used to load data into chart. Customise preferred data source feeding methods.
        You can use one of these options: url, data function, preloaded data. */
        data?: Array<BaseSettingsData>;
        /** The events used to handle user interaction with UI elements. */
        events?: BaseSettingsEvents<BaseChartEventArguments, BaseChartEventArguments>;
        /** Customise chart resize handles or animation duration settings. */
        interaction?: BaseSettingsInteraction;
        legend?: BaseSettingsLegend;
        /** Localizeable strings including export type options and useful default buttons used for chart interaction.
        Buttons like to navigate back, set the chart on full screen and others. */
        localization?: BaseSettingsLocalization;
        /** The parent chart within which the new chart will be rendered. If this property is specified, `container` cannot be
        specified.
        
        Use `area.left`, `area.top`, `area.width` and `area.height` settings to position the subchart within parent chart. */
        parentChart?: BaseApi;
        /** Theme to apply. You can either use this to share configuration objects between multiple charts or use one of the predefined
        themes. */
        theme?: BaseSettings;
        /** The chart's main title. */
        title?: BaseSettingsTitle;
        /** Adjustable settings to manage default and custom toolbar items, as well as toolbar overall appearance. */
        toolbar?: BaseSettingsToolbar;
    }
    export interface BaseSettingsAdvanced {
        /** List of assets to load from assets directory. This should be used to load CSS of JS files that
        are required for the chart to work.
        If `required` is specified, it can be used to determine at runtime if the file has to be included.
        For example, `zc.css` is only included if the page does not already defines the class `.DVSL-suppress-default-styles`. */
        assets?: Array<(string|{
                    url?: string;
                    /** a delegate that should return `true` if the assets has to be loaded and `false` if it can be skipped. */
                    required?: () => boolean;
                })>;
        /** The page size in milimeters for the exported PDF documents. For A4 use `[210, 297]` (this is the default),
        for letter size use `[215.9, 279.4]`. The first number is the width, the second is the height. */
        exportPdfSize?: [number, number];
        /** URL for export proxy requests. To host the service on your own server, please visit <https://github.com/zoomcharts/proxy-export-dotnet/>. */
        exportProxyURL?: string;
        /** Enables high resolution rendering on high DPI screens. As performance is varied across different browsers, disable this to
        improve the performance of your application. 
        
        Unlike some other frameworks, this setting does not force a constant 2x scaling on the chart,
        instead when this is `true`, it renders according to the browser DPI setting. */
        highDPI?: boolean;
        /** Whether to store entire label into bitmap. Use it to improve the performance of your application. */
        labelCache?: boolean;
        /** Whether to show verbose logging. */
        logging?: boolean;
        /** Maximum height of canvas object. The canvas will be stretched if chart is bigger that this. Note that increasing beyond 2048
        is known to cause loss of hardware acceleration on Safari/OSX. */
        maxCanvasHeight?: number;
        /** Maximum width of canvas object. The canvas will be stretched if chart is bigger that this. Note that increasing beyond 2048
        is known to cause loss of hardware acceleration on Safari/OSX. */
        maxCanvasWidth?: number;
        /** Pointer related settings. */
        pointer?: BaseSettingsAdvancedPointer;
        /** Whether to show frames per second on the chart. */
        showFPS?: boolean;
        /** Whether to show the current timestamp on the chart. Use only for debugging. */
        showTimestamp?: boolean;
        /** Whether to show the trail of each touch pointer and also display pointers that are no longer active. 
        For this setting to have effect, `showTouches` must be `true`. */
        showTouchTrail?: boolean;
        /** Whether to use debugging option to paint pointer trails on screen. */
        showTouches?: boolean;
        /** Miscellaneous style settings. */
        style?: BaseSettingsAdvancedStyle;
        /** CSS class for current theme. Used to reference chart container in CSS files. */
        themeCSSClass?: string;
        /** Whether to use requestAnimationFrame for requested paint instead of setTimeout. */
        useAnimationFrame?: boolean;
    }
    export interface BaseSettingsAdvancedPointer {
        /** Pixels pointer can move around and still be registered as a click. */
        clickSensitivity?: number;
        /** Pixels pointer can move around and still be registered as double click. */
        doubleClickSensitivity?: number;
        /** Maximum time in ms between clicks to register a double click. */
        doubleClickTimeout?: number;
        /** The distance in pixels the pointer is allowed to be moved before the long-press event is cancelled. */
        longPressSensitivity?: number;
        /** Time in ms the pointer has to be hold to register a long press (an alternative to clicking the right mouse button). */
        longPressTimeout?: number;
        /** If enabled, normal click event is not sent when user performs a double click. A not so nice side effect is that any on click
        actions are delayed by the double click timeout. Set to false if you are not relying on double click events. */
        noClickOnDoubleClick?: boolean;
        /** Specifies if the chart container is scrolled into view once the chart is clicked.
        Note that the scroll happens on a click, if the pointer is used to for example, drag
        the chart, it will not scroll into view so that the user interaction works properly. */
        scrollIntoView?: boolean;
        /** Time window to use for pointer speed estimation. */
        speedAveragingPeriod?: number;
    }
    export interface BaseSettingsAdvancedStyle {
        /** Loading arc animation style */
        loadingArcStyle?: {
            lineColor?: string;
            lineWidth?: number;
            /** Specifies the location of the loading indicator. */
            location?: string;
            /** Loading arc radius. */
            r?: number;
        };
        /** Message text */
        messageTextStyle?: BaseSettingsTextStyle;
    }
    export interface BaseSettingsArea {
        /** Height of the chart. If undefined the chart height will adapt to container element. */
        height?: number;
        /** The horizontal position of the chart. This setting only applies when this chart is nested within another by using `parentChart` setting. */
        left?: number;
        /** The maximum chart height. Chart will not resize below this. */
        maxHeight?: number;
        /** The maximum chart width. The chart will not resize below this */
        maxWidth?: number;
        /** The minimum chart height. Chart will not resize below this. */
        minHeight?: number;
        /** The minimum chart width. The chart will not resize below this */
        minWidth?: number;
        /** Area style. */
        style?: BaseSettingsAreaStyle;
        /** The vertical position of the chart. This setting only applies when this chart is nested within another by using `parentChart` setting. */
        top?: number;
        /** Width of the chart. If undefined the chart width will adapt to container element. */
        width?: number;
    }
    export interface BaseSettingsAreaStyle {
        /** Background fill color of chart area */
        fillColor?: string;
        /** Background image of  chart area. */
        image?: string;
        /** The foreground fill color of the chart area. `rgba()` with alpha transparency should be used */
        overlayColor?: string;
    }
    export interface BaseSettingsBackgroundStyle extends BaseSettingsLineStyle {
        fillColor?: (string|CanvasGradient);
        shadowBlur?: number;
        shadowColor?: string;
        shadowOffsetX?: number;
        shadowOffsetY?: number;
    }
    export interface BaseSettingsChartPanel {
        /** Panel alignment */
        align?: string;
        /** Whether allow packing over other panels */
        floating?: boolean;
        /** The location of the panel */
        location?: string;
        /** Margin around the panel */
        margin?: number;
        /** Panel side */
        side?: string;
    }
    export interface BaseSettingsCredits {
        /** Enable/disable chart credits. Note that it does not affect exported image. */
        enabled?: boolean;
        /** Whether to render credits on the exported image. Note that it does not affect chart. */
        enabledOnExport?: boolean;
        /** URL of credits image. */
        image?: string;
        /** Image scaling. Use to embed higher resolution images. */
        imageScaling?: number;
        /** Credits location */
        location?: string;
        /** URL to open on click. */
        url?: string;
    }
    export interface BaseSettingsData {
        /** Data loading format. Currently only JSON supported. */
        format?: string;
        /** Data id used for series to reference specific data source. */
        id?: string;
        /** Max number of parallel data requests to issue. More requests will result in faster loading, but might put heavy load on server. */
        numberOfParallelRequests?: number;
        /** Delegate that can be used to process data returned by the server for the HTTP request issued by the chart. */
        postprocessorFunction?: (
            /** The raw data received from the server. */
            data: string) => string;
        /** Provides the ability to embed chart data directly into the chart configuration.
        
        This data can be complete or act as the initial data where the rest will be requested dynamically using
        `url` or `dataFunction`. */
        preloaded?: BaseDataErrorResponse;
        /** Timeout in milliseconds for data requests. This timeout only applies to HTTP requests issued by the chart directly. */
        requestTimeout?: number;
        /** URL that is used to load data */
        url?: string;
        /** List of extra parameters to pass with data URL. */
        urlParameters?: Array<{
                /** Parameter name. */
                name?: string;
                /** Parameter value. */
                value?: string;
            }>;
    }
    export interface BaseSettingsEvents<TArguments extends BaseChartEventArguments, TClickArguments extends BaseChartEventArguments> {
        /** Time to wait after last action before firing onChartUpdate event. */
        chartUpdateDelay?: number;
        /** Function called when whenever current view has changed. Usually after panning and navigation. Use to update any linked views.
        Note that this is also fired after chart initialization and API methods. Use args.origin field to determine event's origin. */
        onChartUpdate?: (
            /** An empty mouse event. */
            event: BaseMouseEvent, args: TArguments) => void;
        /** Function called when user clicks on chart. */
        onClick?: (
            /** The mouse event. */
            event: BaseMouseEvent, args: TClickArguments) => void;
        /** Function called when user double clicks on chart. */
        onDoubleClick?: (
            /** The mouse event. */
            event: BaseMouseEvent, args: TClickArguments) => void;
        /** Function called when error occurs, default behavior is log to console. */
        onError?: (
            /** The mouse event that was the cause of the error. */
            event: BaseMouseEvent, args: BaseChartErrorEventArguments) => void;
        /** Function called when object pointer is on changes. */
        onHoverChange?: (
            /** The mouse event. */
            event: BaseMouseEvent, args: TArguments) => void;
        /** Function called whenever chart placement on screen changes. Note that this is called on every animation frame and is intended
        for painting overlays only. */
        onPositionChange?: (
            /** The mouse event that caused the event (if any) */
            event: BaseMouseEvent, args: TArguments) => void;
        /** Function called when user right clicks on chart. */
        onRightClick?: (
            /** The mouse event. */
            event: BaseMouseEvent, args: TClickArguments) => void;
        /** Function called when selected slices has changed. */
        onSelectionChange?: (
            /** The mouse event. */
            event: BaseMouseEvent, args: TArguments) => void;
        /** Function called when settings are changed. */
        onSettingsChange?: (
            /** An empty mouse event. */
            event: BaseMouseEvent, args: BaseChartSettingsChangeEventArguments) => void;
        /** Function called when user triple clicks on chart. Use it for custom function call. */
        onTripleClick?: (
            /** The mouse event. */
            event: BaseMouseEvent, args: TClickArguments) => void;
    }
    export interface BaseSettingsInteraction {
        /** Controls chart resize handles.
        It's a horizontal line right below any chart to handle whole chart resizes by small steps.
        
        Note that the full screen button used as a main alternative to get a full screen by one click. */
        resizing?: BaseSettingsResizer;
    }
    export interface BaseSettingsLabelStyle {
        /** Text alignment. */
        align?: string;
        /** The angle at which the label are rotated */
        angle?: number;
        /** Ratio between label sizes in different dimensions */
        aspectRatio?: number;
        /** Background style including fill color. */
        backgroundStyle?: BaseSettingsBackgroundStyle;
        /** Radius of item border. Similar to CSS border radius property. Zero radius will show a rectangle */
        borderRadius?: number;
        /** Extra data associated with the label */
        extra?: any;
        /** Label image. */
        image?: string;
        /** Slicing to use tiled images. Array of 4 values: [left, top, width, height] */
        imageSlicing?: [number, number, number, number];
        /** Vertical space between the lines of text. In multiples of text line height. */
        lineSpacing?: number;
        /** Margin around label text */
        margin?: number;
        /** Maximum width of the label. */
        maxWidth?: number;
        /** Padding between item content and item border. */
        padding?: number;
        /** Label text. */
        text?: string;
        /** Text style including fill color and font. */
        textStyle?: BaseSettingsTextStyle;
    }
    export interface BaseSettingsLegend {
        /** Settings to configure the legend marker appearance if disabled series corresponded. */
        advanced?: BaseSettingsLegendAdvanced;
        /** Show/hide chart legend. */
        enabled?: boolean;
        /** Whether to order entries to get possibly equal number of items into columns or rows. If false, once the row or column is full of entries,
        the next element will be first in the new row or column/rows. */
        equalizeRowsColumns?: boolean;
        /** Maximum height of the legend. If null, all available vertical space of chart will be consumed to set as much entries as possible.
        It coincides with the chart height if legend panel side is on a left or right. */
        height?: number;
        /** Vertical space between the lines of text. */
        lineSpacing?: number;
        /** Margin around each legend entry. */
        margin?: number;
        /** Visual element of legend entry with appropriate style to a slice color it corresponds. The content of each legend marker is the
        same as info popup appearing while hovering on slice. */
        marker?: BaseSettingsLegendMarker;
        /** Max number of symbols used in one line of text that applies to any legend entry. */
        maxLineSymbols?: number;
        /** Max number of columns. Use in conjunction with side parameter under the legend panel should be right or left in order to arrange entries by columns. */
        numberOfColumns?: number;
        /** Max number of rows. Use in conjunction with side parameter under the legend panel that should be set as bottom or top in order to arrange entries by rows. */
        numberOfRows?: number;
        /** Padding around each entry text and marker. */
        padding?: number;
        /** Legend enclosing panel settings. */
        panel?: BaseSettingsLegendPanel;
        /** Text settings displaying in legend entries. */
        text?: {
            fillColor?: string;
            font?: string;
        };
        /** Maximum width of the legend. If null, all available horizontal space of chart will be consumed to set as much entries as possible.
        It coincides with the chart width if legend panel side is on a top or bottom. */
        width?: number;
    }
    export interface BaseSettingsLegendAdvanced {
        /** Background color for selected legend entry. */
        selectedBackground?: string;
        /** Border color for selected legend entry. */
        selectedBorder?: string;
    }
    export interface BaseSettingsLegendMarker {
        /** Marker position relative to text */
        alignment?: string;
        /** Line color around marker shape */
        lineColor?: string;
        /** Marker size. */
        size?: number;
    }
    export interface BaseSettingsLegendPanel extends BaseSettingsChartPanel {
        padding?: number;
    }
    export interface BaseSettingsLineStyle {
        lineColor?: string;
        lineDash?: Array<number>;
        lineWidth?: number;
    }
    export interface BaseSettingsLocalization {
        /** Text used on menu close button. */
        closeButton?: string;
        /** Error message when data request has failed. */
        dataRequestFailed?: string;
        /** Message to show when data loading is in progress. */
        loadingLabel?: string;
        /** Strings used in toolbars. */
        toolbar?: BaseSettingsLocalizationToolbar;
    }
    export interface BaseSettingsLocalizationToolbar {
        backButton?: string;
        backTitle?: string;
        exportButton?: string;
        exportCSV?: string;
        exportJpeg?: string;
        exportPDF?: string;
        exportPNG?: string;
        exportTitle?: string;
        exportXLS?: string;
        fullscreenButton?: string;
        fullscreenTitle?: string;
        zoomoutButton?: string;
        zoomoutTitle?: string;
    }
    export interface BaseSettingsResizer {
        /** Enable/disable chart resizing. */
        enabled?: boolean;
        /** Whether to fix chart aspect ratio while resizing. */
        fixedAspect?: boolean;
        /** Distance from chart edge that will be used for resizing. */
        grabDistance?: number;
        /** Max pointer distance from chart edge when resize handle appears. */
        visibilityDistance?: number;
    }
    export interface BaseSettingsTextStyle {
        fillColor?: string;
        font?: string;
        /** The color of the ouline around the text. Specify `null` to disable the outline. */
        outlineColor?: string;
        /** Specify how the edges of the ouline will be calculated. For details on the specific values please see the MDN documentation.
        Note that for certain serif fonts (such as Calibri) this property has no effect - since the font glyphs have rounded edges, the
        outline will be rounded. */
        outlineJoin?: string;
        /** The width of the outline in pixels. */
        outlineWidth?: number;
        shadowBlur?: number;
        shadowColor?: string;
        shadowOffsetX?: number;
        shadowOffsetY?: number;
    }
    export interface BaseSettingsTitle {
        /** Alignment of the title text. */
        align?: string;
        /** Show/hide chart title */
        enabled?: boolean;
        /** Whether to display title on the exported image. Note that it does not affect chart. */
        enabledOnExport?: boolean;
        /** Margin around title text, in px. */
        margin?: number;
        /** Title style */
        style?: {
            fillColor?: string;
            font?: string;
        };
        /** Title text. */
        text?: string;
    }
    export interface BaseSettingsToolbar {
        /** Toolbar align. Note that it can be overridden for individual items using item.align. Also Use 'top' or 'bottom'
        sides in conjunction with 'left', 'right' align or use 'left', 'right' sides with 'top', 'bottom'. */
        align?: string;
        /** Whether to show back button in toolbar. */
        back?: boolean;
        /** CSS class name for the toolbar HTML panel. */
        cssClass?: string;
        /** Show/hide toolbar. */
        enabled?: boolean;
        /** Whether to show export dropdown in toolbar. */
        export?: boolean;
        /** A list of user defined items to show in toolbar. These are displayed in addition to the
        `items` collection (which includes the default buttons). */
        extraItems?: Array<(string|BaseSettingsToolbarItem)>;
        /** A list of toolbar items. If this is specified, it overrides all the default buttons.
        Use `extraItems` to specify items that should be displayed in addition to the defaults. */
        items?: Array<(string|BaseSettingsToolbarItem)>;
        /** Toolbar location inside chart. */
        location?: string;
        /** Whether to show or hide labels next to toolbar items by default. Note that it can be overridden for individual items using item.showLabels. */
        showLabels?: boolean;
        /** Toolbar placement side. Note that it can be overridden for individual items using item.side. */
        side?: string;
        /** Whether to show the zoom out button. */
        zoomOut?: boolean;
    }
    export interface BaseSettingsToolbarItem extends BaseSettingsToolbarItemBase {
        /** Item align. */
        align?: string;
        /** An array of nested items. Setting this will display a dropdown item instead of a simple button.
        
        Note that nested dropdowns are not supported. */
        dropDownItems?: Array<BaseSettingsToolbarItemBase>;
        /** Built in toolbar item name. Note that not all buttons are available for all charts. */
        item?: string;
        /** Item location */
        location?: string;
        /** Whether to show button label. */
        showLabel?: boolean;
        /** Item side. */
        side?: string;
    }
    export interface BaseSettingsToolbarItemBase {
        /** CSS class name. */
        cssClass?: string;
        /** Item image, URL to image. */
        image?: string;
        /** Item label */
        label?: string;
        /** Function to execute on item click. */
        onClick?: (event: MouseEvent, chart: BaseApi) => void;
        /** Item title, shown on hover. */
        title?: string;
    }
    /** Describes the base properties shared between all events raised by the different charts. */
    export interface ItemsChartChartClickEventArguments extends ItemsChartChartEventArguments {
        clickItem: BaseLabel;
        clickLink: ItemsChartLink;
        clickNode: ItemsChartNode;
    }
    /** Describes the base properties shared between all events raised by the different charts. */
    export interface ItemsChartChartEventArguments extends BaseChartEventArguments {
        chartX: number;
        chartY: number;
        hoverItem: (ItemsChartItemsLayerLinkItem|ItemsChartItemsLayerNodeItem);
        hoverLink: ItemsChartLink;
        hoverNode: ItemsChartNode;
        selection: Array<(ItemsChartLink|ItemsChartNode)>;
    }
    export interface ItemsChartDataObjectBase extends BaseDataErrorResponse {
    }
    export interface ItemsChartDataObjectLink extends ItemsChartDataObjectBase {
        className?: string;
        /** The ID of the node where the link originates. */
        from: string;
        /** The unique identifier of the link. */
        id?: string;
        style?: ItemsChartSettingsLinkStyle;
        /** The ID of the target node. */
        to: string;
        value?: number;
    }
    export interface ItemsChartDataObjectNode extends ItemsChartDataObjectBase {
        className?: string;
        /** The unique identifier of the node. */
        id: string;
        /** Determines if the node data is complete (when `true`) or if the data is incomplete and only provided
        as a placeholder (value `false`).
        
        In most cases this should be specified as `true`, the exception being a scenario where another node contains
        a link to this node, that link is included in the data response but the data for this node is not available
        so a placeholder is created and the chart will have to issue another data request to load the actual data. */
        loaded: boolean;
        style?: ItemsChartSettingsNodeStyle;
    }
    export interface ItemsChartLink extends ItemsChartSettingsLinkStyle {
        /** Data object that this link represents. */
        data: ItemsChartDataObjectLink;
        /** Node at the start of the link. */
        from: ItemsChartNode;
        /** Whether or not the mouse cursor is hovering over the link. */
        hovered: boolean;
        /** ID of the link */
        id: string;
        /** Specifies if the link is invisible - thus completely skipping the drawing and hit testing. However the link is not removed.
        This flag is set only by user code. */
        invisible: boolean;
        /** Link relevance is used in NetChart when the navigation mode is `focusnodes` and is intended to be a rough measure of how "interesting" a link is.
        For information about what relevance is and how it's calculated, see the [Focusnodes algorithm](net-chart/advanced-topics/focusnodes-algorithm-details.html). */
        relevance: number;
        /** If this is `false`, then the node is visible. If it is `true` or a non-zero a number (a "truthy" value), then the removal animation is in progress.
        After the removal animation completes, the node will be hidden. */
        removed: (boolean|number);
        /** Whether or not the link is selected. */
        selected: boolean;
        /** Node at the end of the link. */
        to: ItemsChartNode;
    }
    /** A visible node. */
    export interface ItemsChartNode extends ItemsChartSettingsNodeStyle {
        /** Whether or not the node is a background node. This flag is set only by user code. */
        background: boolean;
        /** Data object that this node represents */
        data: ItemsChartDataObjectNode;
        /** Data obects for all links that are attached to the node. Note that not all of them may be visible. Only links with both end nodes visible are shown. */
        dataLinks: Array<ItemsChartDataObjectLink>;
        /** Whether or not the node is expanded. A node counts as "expanded" if all its links are visible. */
        expanded: boolean;
        focused: boolean;
        /** Whether or not the mouse cursor is hovering over the node. */
        hovered: boolean;
        /** ID of the node */
        id: string;
        /** Specifies if the node is invisible - thus completely skipping the drawing and hit testing. However the node is not removed.
        This flag is set only by user code. */
        invisible: boolean;
        /** A list of additional items for the particular node. To add or remove items, change this array. */
        items: Array<ItemsChartSettingsNodeItem>;
        /** Visible links attached to the node. */
        links: Array<ItemsChartLink>;
        /** Node relevance is used in NetChart when the navigation mode is `focusnodes` and is intended to be a rough measure of how "interesting" a node is.
        For information about what relevance is and how it's calculated, see the [Focusnodes algorithm](net-chart/advanced-topics/focusnodes-algorithm-details.html). */
        relevance: number;
        /** If this is `false`, then the node is visible. If it is `true` or a non-zero a number (a "truthy" value), then the removal animation is in progress.
        After the removal animation completes, the node will be hidden. */
        removed: (boolean|number);
        /** Whether or not the node is selected. */
        selected: boolean;
        /** If true, the node is fixed in place and does not get affected by layout algorithms. This gets set automatically after the user drags a node in NetChart. */
        userLock: boolean;
    }
    export interface ItemsChartItemsLayerLinkItem extends ItemsChartItemsLayerLinkLabel {
        /** Offset from link center along link direction. In pixels. */
        lx?: number;
        /** Offset from link center perpendicular to link direction. In pixels. */
        ly?: number;
        /** Offset from link center along link direction. A fraction of link length. */
        px?: number;
        /** Offset from link center perpendicularly to link direction. A fraction of link radius. */
        py?: number;
    }
    export interface ItemsChartItemsLayerLinkLabel extends ItemsChartItemsLayerNodeLabel {
        /** Whether to rotate link labels in the same direction as link */
        rotateWithLink?: boolean;
    }
    export interface ItemsChartItemsLayerNodeItem extends ItemsChartItemsLayerNodeLabel {
        /** X offset from node center. A fraction of node width. */
        px?: number;
        /** Y offset from node center. A fraction of node height. */
        py?: number;
    }
    export interface ItemsChartItemsLayerNodeLabel extends BaseLabel {
        /** Whether to apply different scale according to initial size of the link or node. */
        scaleWithSize?: boolean;
        /** Whether to apply the scale if zoom changes. If false, the label size never changes. */
        scaleWithZoom?: boolean;
    }
    export enum ItemsChartNodeAnchorMode {
        Fixed = 2,
        /** Node if free-floating, */
        Floating = 0,
        Scene = 1,
    }
    export interface ItemsChartSettings extends BaseSettings {
        advanced?: ItemsChartSettingsAdvanced;
        /** Settings used to load data into chart. Customise preferred data source feeding methods.
        You can use one of these options: url, data function, preloaded data. */
        data?: Array<ItemsChartSettingsData>;
        /** The events used to handle user interaction with UI elements. */
        events?: BaseSettingsEvents<ItemsChartChartEventArguments, ItemsChartChartClickEventArguments>;
        /** Info popup for item - meaning links or nodes - with configurable content rendered. */
        info?: {
            /** Show/hide info popup */
            enabled?: boolean;
            /** Returns html string to display in passed links info popup. */
            linkContentsFunction?: (
                /** link data */
                linkData: ItemsChartDataObjectLink, 
                /** link object */
                link: ItemsChartLink, 
                /** callback function */
                asyncCallback: (contents: string) => void) => string;
            /** Returns html string to display in passed nodes info popup. */
            nodeContentsFunction?: (
                /** node data */
                nodeData: ItemsChartDataObjectNode, 
                /** node object */
                node: ItemsChartNode, 
                /** callback function */
                callback: (contents: string) => void) => string;
        };
        /** Customise chart resize handles or animation duration settings. */
        interaction?: ItemsChartSettingsInteraction;
        /** Configurable link menu with option to specify a range of displaying buttons. */
        linkMenu?: ItemsChartSettingsMenu;
        /** Configurable node menu with option to specify a range of displaying buttons. */
        nodeMenu?: ItemsChartSettingsMenu;
        style?: {
        };
    }
    export interface ItemsChartSettingsAdvanced extends BaseSettingsAdvanced {
        /** Whether to display a loading indicator on every node, otherwise only a global loading indicator. */
        perNodeLoadingIndicator?: boolean;
    }
    /** If display attribute is "customShape", SettingsCustomShape are
    required to determine how to render the custom shape */
    export interface ItemsChartSettingsCustomShape {
        /** When drawing links/arrows to the shape it may be desirable to determine the point where the arrow
        reaches and touches the respective shape. Given the start point of the ray, this function should return
        the distance to the outer border of the shape */
        distanceToEdge?: (
            /** radius */
            r: number, 
            /** width */
            w: number, 
            /** the ray towards shape */
            ddx: number, 
            /** the ray towards shape */
            ddy: number) => number;
        /** Function to test if hover action was over the respective shape. The function will be called in the context of the appropriate INode (i.e. "this"=INode). */
        hitTest?: (
            /** X coordinate of the hit test */
            x: number, 
            /** Y coordinate of the hit test */
            y: number, 
            /** Node scalign factor */
            itemScale: number, 
            /** Previous closest distance. */
            prevBest: number) => number;
        /** Method performed on update (such as hover). The function will be called in the context of the appropriate INode (i.e. "this"=INode). */
        onUpdate?: (
            /** The canvas on which the node will be rendered */
            context: CanvasRenderingContext2D, 
            /** The node radius radius, also available as "this.radius" */
            radius: number) => {
                /** Bounds of the node for the given radius. The values are [x0, y0, x1, y1] for the upper left and lower right corner respectively. */
                bounds: [number, number, number, number];
                /** One half of the width of the node. */
                HWidth: number;
                /** One half of the height of the node */
                HHeight: number;
                /** Optional. The anchor point [x,y] where the links will be attached. If not specified, the anchor points will be left at defaults. */
                anchor?: [number, number];
            };
        /** Function to render the custom shape in canvas 2d context. The function will be called in the context of the appropriate INode (i.e. "this"=INode). */
        paint?: (
            /** The canvas 2d rendering context for rendering */
            context: CanvasRenderingContext2D, 
            /** The X value of the center coordinate, where node needs to be rendered */
            x: number, 
            /** The Y value of the center coordinate where the node needs to be rendered */
            y: number, 
            /** Half of the width of the node */
            hWidth: number, 
            /** Half of the height of the node */
            hHeight: number, 
            /** Image of the node, if any. */
            image: (HTMLImageElement|HTMLCanvasElement), 
            /** Whether or not to paint details (image, label). When the node is zoomed out far enough, the details aren't painted. */
            paintDetails: boolean) => void;
        /** Function to render the selection shape for custom shape in canvas 2d context.
        The function will be called in the context of the appropriate INode (i.e. "this"=INode). */
        paintSelection?: (
            /** The canvas 2d rendering context for rendering */
            context: CanvasRenderingContext2D, 
            /** The X value of the center coordinate, where node needs to be rendered */
            x: number, 
            /** The Y value of the center coordinate where the node needs to be rendered */
            y: number, 
            /** Half of the width of the node */
            hWidth: number, 
            /** Half of the height of the node */
            hHeight: number) => void;
    }
    export interface ItemsChartSettingsData extends BaseSettingsData {
        /** Count of caching items including only links and nodes. */
        cacheSize?: number;
        /** Specifies the random layout method: grid, tree, uniform. The default is uniform. */
        random?: string;
        randomGridLinkProbability?: number;
        /** Generates random data. */
        randomLinks?: number;
        /** Generates random data. Specify a value larger than 0 to enable generating random data. */
        randomNodes?: number;
        randomTreeDensity?: number;
        /** Max number of nodes to submit in a single request. */
        requestMaxUnits?: number;
    }
    export interface ItemsChartSettingsInteraction extends BaseSettingsInteraction {
        /** Whether to allow moving nodes around. */
        nodesMovable?: boolean;
        /** Move chart vertically and horizontally by clicking on the main chart pane and dragging it on any direction. */
        panning?: {
            /** Enables/disables chart panning. */
            enabled?: boolean;
        };
        /** Select node to expand it or getting path. */
        selection?: ItemsChartSettingsInteractionSelection;
        /** Zoom in or out by swiping up or down with mouse scroll pad or by using the Zoom-out feature at the top left. */
        zooming?: ItemsChartSettingsInteractionZooming;
    }
    export interface ItemsChartSettingsInteractionSelection {
        /** Whether to move nodes outside of screen area. */
        allowMoveNodesOffscreen?: boolean;
        /** Enable/disable selection. */
        enabled?: boolean;
        /** Whether to set links selectable. */
        linksSelectable?: boolean;
        /** Whether to retain nodes location after being moved by the user. */
        lockNodesOnMove?: boolean;
        /** Whether to set nodes selectable. */
        nodesSelectable?: boolean;
        /** Max click distance from object that still counts as click on the object. */
        tolerance?: number;
    }
    export interface ItemsChartSettingsInteractionZooming {
        /** Whether to auto zoom every time user clicks on the chart. */
        autoZoomAfterClick?: boolean;
        /** A double-click on empty space will trigger zoom in by this value. Set to null or false to disable double click zooming. */
        doubleClickZoom?: number;
        /** Whether to zoom by two finger pinch. */
        fingers?: boolean;
        /** Sensitivity of wheel zoom. */
        sensitivity?: number;
        /** Whether to zoom by mouse wheel. */
        wheel?: boolean;
        /** Enable/Disable zoom in on double click. */
        zoomInOnDoubleClick?: boolean;
    }
    export interface ItemsChartSettingsItemsLayerLabelStyle extends BaseSettingsLabelStyle {
        /** Whether to apply different scale according to initial size of the link or node. */
        scaleWithSize?: boolean;
        /** Whether to apply the scale if zoom changes. If false, the label size never changes. */
        scaleWithZoom?: boolean;
    }
    export interface ItemsChartSettingsItemsLayerLinkLabelStyle extends ItemsChartSettingsItemsLayerLabelStyle {
        /** Whether to rotate link labels in the same direction as link */
        rotateWithLink?: boolean;
    }
    export interface ItemsChartSettingsItemsLayerStyle {
        /** An "all included" style function. */
        allObjectsStyleFunction?: (
            /** all nodes that currently loaded on the chart */
            nodes: Array<ItemsChartNode>, 
            /** all links that are currently loaded on the chart */
            links: Array<ItemsChartLink>) => {
                modifiedNodes: Array<ItemsChartNode>;
                modifiedLinks: Array<ItemsChartLink>;
            };
        /** Items are small UI elements that provide extra information. Items are attached to nodes or links and can display a label, image or both. */
        item?: ItemsChartSettingsItemsLayerLabelStyle;
        /** Default link style. */
        link?: ItemsChartSettingsLinkStyle;
        /** The class rules to apply individual style for link subset. Use known CSS class definition practice.
        Define one or more classes by specifying name and style and apply those by node definition. If multiple
        classes applied separate them with space and class rules will cascade in order of class definition. */
        linkClasses?: Array<{
                /** Class name */
                className?: string;
                /** Style settings */
                style?: ItemsChartSettingsLinkStyle;
            }>;
        /** Link decorations are not painted if link is shorter than this. */
        linkDecorationMinSize?: number;
        /** Link decoration size calculated as a product of the link radius and scale factor. The value lower than linkDecorationMinSize will take no effect. */
        linkDecorationScale?: number;
        /** Link details like labels, items are hidden if link width in pixels is below this value. */
        linkDetailMinSize?: number;
        /** Link details like labels, items are not rendered if chart zoom is below this value. */
        linkDetailMinZoom?: number;
        /** Additional style to apply when a link is hovered. */
        linkHovered?: ItemsChartSettingsLinkStyle;
        /** Link text style */
        linkLabel?: ItemsChartSettingsItemsLayerLinkLabelStyle;
        /** Base node size of link label that scales with link size. */
        linkLabelScaleBase?: number;
        /** An object defining one or more functions used to calculate node rendering style.
        Structure: { 'rule1':function1(nodeObj), 'rule2':function2(nodeObj) }
        The functions are executed in lexicographic order whenever node data or links change.
        Each function can modify the nodeObj to add specific style elements.
        @deprecated use linkStyleFunction instead */
        linkRules?: Dictionary<(node: ItemsChartLink) => void>;
        /** Additional style to apply when link is selected. */
        linkSelected?: ItemsChartSettingsLinkStyle;
        /** A a style function for links. Will be called whenever a link property or data has changed.
        Use to dynamically set link style fields. */
        linkStyleFunction?: (node: ItemsChartLink) => void;
        /** Default node style. */
        node?: ItemsChartSettingsNodeStyle;
        /** Default node  anchor style. */
        nodeAnchor?: ItemsChartSettingsNodeAnchorStyle;
        /** Additional style to apply for background nodes. */
        nodeBackground?: ItemsChartSettingsNodeStyle;
        /** The class rules to apply individual style for node subset. Use known CSS class definition practice.
        Define one or more classes by specifying name and style and apply those by node definition. If multiple
        classes applied separate them with space and class rules will cascade in order of class definition. */
        nodeClasses?: Array<{
                /** Class name */
                className?: string;
                /** Style settings */
                style?: ItemsChartSettingsNodeStyle;
            }>;
        /** Node details like labels, items, images are hidden if node width in pixels is below this value. */
        nodeDetailMinSize?: number;
        /** Node details like labels, items, images are not rendered if chart zoom is below this value. */
        nodeDetailMinZoom?: number;
        /** Additional style to apply when node is expanded. */
        nodeExpanded?: ItemsChartSettingsNodeStyle;
        /** Additional style to apply when node is focused. */
        nodeFocused?: ItemsChartSettingsNodeStyle;
        /** Additional style to apply when a node is hovered. */
        nodeHovered?: ItemsChartSettingsNodeStyle;
        /** Node label style. */
        nodeLabel?: ItemsChartSettingsItemsLayerLabelStyle;
        /** Base node size of node label that scales with node size. */
        nodeLabelScaleBase?: number;
        /** Additional style to apply when a node position is locked. */
        nodeLocked?: ItemsChartSettingsNodeStyle;
        /** Additional style to apply when node data is not yet loaded. */
        nodeNotLoaded?: ItemsChartSettingsNodeStyle;
        /** An object defining one or more functions used to calculate node rendering style.
        @deprecated use nodeStyleFunction instead */
        nodeRules?: Dictionary<(node: ItemsChartNode) => void>;
        /** Additional style to apply when node is selected. */
        nodeSelected?: ItemsChartSettingsNodeStyle;
        /** A a style function for nodes. Will be called whenever a node property or data has changed.
        Use to dynamically set node style fields. */
        nodeStyleFunction?: (node: ItemsChartNode) => void;
        /** Color for fade out animation of removed objects. */
        removedColor?: string;
        /** Determines if link radius (width) is automatically scaled when the chart is zoomed in or out.
        If set to `null`, the value is inherited from `scaleObjectsWithZoom` */
        scaleLinksWithZoom?: boolean;
        /** Determines if node radius is automatically scaled when the chart is zoomed in or out.
        If `scaleLinksWithZoom` is not set, this value also impacts links. */
        scaleObjectsWithZoom?: boolean;
        selection?: {
            fillColor?: string;
            lineColor?: string;
            shadowBlur?: number;
            shadowColor?: string;
            shadowOffsetX?: number;
            shadowOffsetY?: number;
            sizeConstant?: number;
            sizeProportional?: number;
        };
    }
    /** Link item. */
    export interface ItemsChartSettingsLinkItem extends ItemsChartSettingsItemsLayerLabelStyle {
        /** Offset from link center along link direction. In pixels. */
        lx?: number;
        /** Offset from link center perpendicular to link direction. In pixels. */
        ly?: number;
        /** Offset from link center along link direction. A fraction of link length.
        Value of -1 places the item at the start of the link.
        Value of 1 places the item at the end of the link. */
        px?: number;
        /** Offset from link center perpendicularly to link direction. A fraction of link radius. */
        py?: number;
        /** Whether to rotate link labels in the same direction as link */
        rotateWithLink?: boolean;
        /** X offset from link center in pixels. */
        x?: number;
        /** Y offset from link center in pixels. */
        y?: number;
    }
    export interface ItemsChartSettingsLinkStyle {
        cursor?: string;
        /** null or "U", "D", "L", "R" */
        direction?: string;
        fillColor?: string;
        /** The decoration rendered where the link starts. */
        fromDecoration?: string;
        /** Specifies if the link is invisible - thus completely skipping the drawing and hit testing. This can be used, for example, to hide all links
        and showing only ones that meet certain criteria using `linkStyleFunction`. */
        invisible?: boolean;
        items?: Array<ItemsChartSettingsLinkItem>;
        label?: string;
        length?: number;
        lineDash?: Array<number>;
        /** Specifies the width of the line rendered for this link. */
        radius?: number;
        shadowBlur?: number;
        shadowColor?: string;
        shadowOffsetX?: number;
        shadowOffsetY?: number;
        strength?: number;
        /** The decoration rendered where the link ends. */
        toDecoration?: string;
        toPieColor?: string;
        toPieValue?: number;
    }
    export interface ItemsChartSettingsMenu {
        /** Buttons to show in node menu. It is possible to add custom buttons or use built-in buttons if
        that particular menu supports them.
        
        Currently only the `nodeMenu` on the NetChart supports any of following built-in buttons: `expand`, `focus`, `lock`, `hide`. */
        buttons?: Array<(string|ItemsChartSettingsMenuButton)>;
        /** Prepare html string or DOM element to include in the menu. Called whenever a menu is about to be shown.
        If this callback is not defined, the menu will display the label of the element (node or link). */
        contentsFunction?: (
            /** node data */
            data: ItemsChartDataObjectNode, 
            /** node object */
            node: ItemsChartNode, 
            /** callback function if contents are not immediately available */
            callback: (
                /** New contents to include in the menu */
                result: (string|HTMLElement)) => void) => (string|HTMLElement);
        /** Show/hide node/link menu. */
        enabled?: boolean;
        /** Whether to add a view data button to the menu. Useful for debugging. */
        showData?: boolean;
    }
    /** Describes a custom button that is added to the menu. */
    export interface ItemsChartSettingsMenuButton {
        /** The CSS class that is applied to the HTML link element (the button). */
        className?: string;
        /** The callback that will be invoked when the menu is clicked. */
        onClick?: (
            /** The link or node for which the button is being created. */
            target: (ItemsChartNode|ItemsChartLink), 
            /** The HTML element that represents the button. */
            button: HTMLAnchorElement) => void;
        /** The callback that will be invoked when the menu button is first created for the particular object. */
        onInit?: (
            /** The link or node for which the button is being created. */
            target: (ItemsChartNode|ItemsChartLink), 
            /** The HTML element that represents the button. */
            button: HTMLAnchorElement) => void;
        /** The callback that will be invoked when the menu is being opened after creation. The callback is also
        invoked for every button after any menu button is clicked. */
        onRefresh?: (
            /** The link or node for which the button is being created. */
            target: (ItemsChartNode|ItemsChartLink), 
            /** The HTML element that represents the button. */
            button: HTMLAnchorElement) => void;
        /** The text (HTML is supported) that is displayed within the button. */
        text?: string;
    }
    export interface ItemsChartSettingsNodeAnchorStyle {
        lineColor?: string;
        lineDash?: Array<number>;
        lineWidth?: number;
        shadowBlur?: number;
        shadowColor?: string;
        shadowOffsetX?: number;
        shadowOffsetY?: number;
    }
    /** Node item. */
    export interface ItemsChartSettingsNodeItem extends ItemsChartSettingsItemsLayerLabelStyle {
        /** X offset from node center. A fraction of node width.
        Value of -1 places the item at the left edge of the node.
        Value of 1 places the item at the right edge of the node. */
        px?: number;
        /** Y offset from node center. A fraction of node height.
        Value of -1 places the item at the top edge of the node.
        Value of 1 places the item at the bottom edge of the node. */
        py?: number;
        /** X offset from node center in pixels. */
        x?: number;
        /** Y offset from node center in pixels. */
        y?: number;
    }
    export interface ItemsChartSettingsNodeStyle {
        /** Node anchor mode. */
        anchorMode?: ItemsChartNodeAnchorMode;
        anchorStyle?: ItemsChartSettingsNodeAnchorStyle;
        /** Node anchor y position. If not set, initial position will be calculated automatically and conserved.
        The coordinate space is dependant on `anchorMode` value.
        * anchorMode = "Scene" - the value is in scene coordinates.
        * anchorMode = "Display" - the value is in pixels from top-left corner of the chart area. */
        anchorX?: number;
        /** Node anchor y position. If not set, initial position will be calculated automatically and conserved.
        The coordinate space is dependant on `anchorMode` value.
        * anchorMode = "Scene" - the value is in scene coordinates.
        * anchorMode = "Fixed" - the value is in pixels from top-left corner of the chart area. */
        anchorY?: number;
        /** When display="rectangle", this setting determines the width/height ratio of the rectangle.
        The longest edge of the rectangle will be set to "radius" and the shortest will be calculated from this variable. */
        aspectRatio?: number;
        coordinates?: (Array<number>|Array<Array<number>>);
        /** Cursor to show when node is hovered. */
        cursor?: string;
        /** Custom shape settings supplied, if display == "customShape" */
        customShape?: ItemsChartSettingsCustomShape;
        /** Valid values: circle (default), text, roundtext, droplet, rectangle, customShape */
        display?: string;
        fillColor?: string;
        image?: string;
        /** Specifies the image cropping method. Valid values are `false` (disable cropping), `true` (default cropping mode), `"crop"`, `"letterbox"` and `"fit"`. */
        imageCropping?: (boolean|string);
        /** Specifies if the node is invisible - thus completely skipping the drawing and hit testing. This can be used, for example, to hide all nodes
        and showing only ones that meet certain criteria using `nodeStyleFunction`. */
        invisible?: boolean;
        /** Additional items that are rendered on and around the node. */
        items?: Array<ItemsChartSettingsNodeItem>;
        /** The label text that is displayed below the node. Set to an empty string "" to remove the label if it has been added before. */
        label?: string;
        labelStyle?: ItemsChartSettingsItemsLayerLabelStyle;
        lineColor?: string;
        lineDash?: Array<number>;
        lineWidth?: number;
        /** Node opacity. */
        opacity?: number;
        radius?: number;
        shadowBlur?: number;
        shadowColor?: string;
        shadowOffsetX?: number;
        shadowOffsetY?: number;
    }
    export interface ItemsChartSettingsNodesLayerStyle extends ItemsChartSettingsItemsLayerStyle {
        /** Removed object fadeout time. */
        fadeTime?: number;
        /** style for hidden link hints. */
        hiddenLinks?: {
            lineColor?: string;
            lineWidth?: number;
            size?: number;
        };
        /** Link radius auto distribution method. */
        linkAutoScaling?: string;
        /** Link length auto distribution method. */
        linkLengthAutoScaling?: string;
        /** Min and max value of link length before zooming is applied. */
        linkLengthExtent?: [number, number];
        /** Min and max value of link half-width before zooming is applied. */
        linkRadiusExtent?: [number, number];
        /** Link strength auto distribution method. */
        linkStrengthAutoScaling?: string;
        /** Min and max value for link strength. */
        linkStrengthExtent?: [number, number];
        /** Distance between multiple links between two nodes. */
        multilinkSpacing?: number;
        /** Controls automatic node scaling. */
        nodeAutoScaling?: string;
        /** Min and max value of node radius, before zooming is applied. */
        nodeRadiusExtent?: [number, number];
    }
    export interface NetChartBarSettingsLocalizationToolbar extends BaseSettingsLocalizationToolbar {
        fitButton?: string;
        fitTitle?: string;
        freezeButton?: string;
        freezeTitle?: string;
        rearrangeButton?: string;
        rearrangeTitle?: string;
        unfreezeTitle?: string;
    }
    export interface NetChartBarSettingsToolbar extends BaseSettingsToolbar {
        /** Whether to show the zoom slider control. */
        zoomControl?: boolean;
    }
    /** Describes the base properties shared between all events raised by the different charts. */
    export interface NetChartChartClickEventArguments extends NetChartChartEventArguments {
        clickItem: BaseLabel;
        clickLink: ItemsChartLink;
        clickNode: ItemsChartNode;
    }
    /** Describes the base properties shared between all events raised by the different charts. */
    export interface NetChartChartEventArguments extends ItemsChartChartEventArguments {
        links: Array<ItemsChartLink>;
        nodes: Array<ItemsChartNode>;
    }
    export interface NetChartDataObject extends BaseDataErrorResponse {
        links: Array<NetChartDataObjectLink>;
        nodes: Array<NetChartDataObjectNode>;
    }
    export interface NetChartDataObjectLink extends ItemsChartDataObjectLink {
    }
    export interface NetChartDataObjectNode extends ItemsChartDataObjectNode {
        value?: number;
        x?: number;
        y?: number;
    }
    export interface NetChartSettings extends ItemsChartSettings {
        /** Chart area related settings. */
        area?: NetChartSettingsArea;
        /** Settings used to load data into chart. Customise preferred data source feeding methods.
        You can use one of these options: url, data function, preloaded data. */
        data?: Array<NetChartSettingsData>;
        /** The events used to handle user interaction with UI elements. */
        events?: BaseSettingsEvents<NetChartChartEventArguments, NetChartChartClickEventArguments>;
        /** Configurable conditions to filter the raw data values for subset of drawing nodes and links. */
        filters?: {
            /** Determine if link can be displayed. Invoked whenever a link is about to be shown or its data has changed.
            Only links that have been allowed by nodeFilter for both end nodes will be passed here. */
            linkFilter?: (
                /** link data object */
                linkData: NetChartDataObjectLink, 
                /** data object representing node where the link begins */
                fromNodeData: NetChartDataObjectNode, 
                /** data object representing node where the link ends */
                toNodeData: NetChartDataObjectNode) => boolean;
            /** Function called whenever there is more than one link between two nodes. Only links that were allowed by nodeFilter, linkFilter and nodeLinksProcessor
            will be passed here. The function can return either some of the original links, or create completely new links.
            In the latter case, link IDs MUST be unique (links passed in are guaranteed to have unique IDs). */
            multilinkProcessor?: (
                /** array of link data objects */
                arrayOfLinkData: Array<NetChartDataObjectLink>, 
                /** data object representing node where the links begins */
                fromData: NetChartDataObjectNode, 
                /** data object representing node where the links ends */
                toData: NetChartDataObjectNode) => (NetChartDataObjectLink|Array<NetChartDataObjectLink>);
            /** Determine if node can be displayed. Invoked whenever a node or one of its links is about to be shown, or if data for the node (or its links) has changed. */
            nodeFilter?: (
                /** Node data object */
                nodeData: NetChartDataObjectNode, 
                /** Unfiltered array of link data objects (linkFilter/nodeLinksProcessor/multilinkProcessor have not been applied) */
                arrayOfLinkData: Array<NetChartDataObjectLink>) => boolean;
            /** From links that were allowed by nodeFilter and linkFilter, select the ones that will be displayed. This is basically a bulk version of linkFilter.
            It is also allowed to return a completely new set of links, however link IDs MUST be unique in this case
            (links passed in are guaranteed to have unique IDs). */
            nodeLinksProcessor?: (
                /** Node data object */
                nodeData: NetChartDataObjectNode, 
                /** Array of link data objects. All links are connected to the node. Only links that were allowed by nodeFilter/linkFilter will be passed here.
                MultilinkProcessor has not been applied yet. */
                links: Array<NetChartDataObjectLink>) => Array<NetChartDataObjectLink>;
        };
        /** Customise chart resize handles or animation duration settings. */
        interaction?: NetChartSettingsInteraction;
        /** Adjustable settings to get desired net chart layout style and animation while and before interacting. */
        layout?: NetChartSettingsLayout;
        /** The chart legend representing classes attached to nodes or links.
        The legend will display the visual styles specified in `style.nodeClasses` and `style.linkClasses` - by default these are not defined
        so the legend will be empty. */
        legend?: NetChartSettingsLegend;
        /** Localizeable strings including export type options and useful default buttons used for chart interaction.
        Buttons like to navigate back, set the chart on full screen and others. */
        localization?: NetChartSettingsLocalization;
        /** Settings for NetChart navigation (expanding/collapsing/focusing/unfocusing/showing/hiding). The main setting is "mode" which determines the overall
        algorithm for navigation. Other parameters can tweak this algorithm, but not all parameters apply to all algorithms. */
        navigation?: NetChartSettingsNavigation;
        /** Chart style settings. */
        style?: ItemsChartSettingsNodesLayerStyle;
        /** Theme to apply. You can either use this to share configuration objects between multiple charts or use one of the predefined
        themes. */
        theme?: NetChartSettings;
        /** Adjustable settings to manage default and custom toolbar items, as well as toolbar overall appearance. */
        toolbar?: NetChartBarSettingsToolbar;
    }
    export interface NetChartSettingsArea extends BaseSettingsArea {
        /** The center of the chart. Fraction of chart width. 0 = left side, 1 = right side.
        @deprecated this property is no longer used */
        centerX?: number;
        /** The center of the chart. Fraction of chart height, 0 = top, 1 = botom.
        @deprecated this property is no longer used */
        centerY?: number;
        /** Inner bottom padding, nodes will avoid this area.
        If the value is <= 1 then the value represents the fraction from the chart width.
        Otherwise it represents the padding value in pixels.
        @deprecated this property is no longer used */
        paddingBottom?: number;
        /** Inner left padding, nodes will avoid this area.
        If the value is <= 1 then the value represents the fraction from the chart width.
        Otherwise it represents the padding value in pixels.
        @deprecated this property is no longer used */
        paddingLeft?: number;
        /** Inner right padding, nodes will avoid this area.
        If the value is <= 1 then the value represents the fraction from the chart width.
        Otherwise it represents the padding value in pixels.
        @deprecated this property is no longer used */
        paddingRight?: number;
        /** Inner top padding, nodes will avoid this area.
        If the value is <= 1 then the value represents the fraction from the chart width.
        Otherwise it represents the padding value in pixels.
        @deprecated this property is no longer used */
        paddingTop?: number;
    }
    export interface NetChartSettingsData extends ItemsChartSettingsData {
        /** Load more chart data. */
        dataFunction?: (
            /** node IDs */
            nodes: Array<string>, 
            /** callback function to execute when data arrived correctly */
            success: (data: NetChartDataObject) => void, 
            /** callback function to execute when error occure while loading data */
            fail: (result: BaseDataErrorResponse) => void) => void;
        /** Provides the ability to embed chart data directly into the chart configuration.
        
        This data can be complete or act as the initial data where the rest will be requested dynamically using
        `url` or `dataFunction`. */
        preloaded?: NetChartDataObject;
    }
    export interface NetChartSettingsInteraction extends ItemsChartSettingsInteraction {
        /** The ability to rotate the chart with the pinch gesture, using 2 fingers */
        rotation?: {
            /** Enables/disables chart rotation via the multitouch gesture events */
            fingers?: boolean;
        };
        /** Select node to expand it or getting path. */
        selection?: NetChartSettingsInteractionSelection;
        /** Zoom in or out by swiping up or down with mouse scroll pad or by using the Zoom-out feature at the top left. */
        zooming?: NetChartSettingsInteractionZooming;
    }
    export interface NetChartSettingsInteractionSelection extends ItemsChartSettingsInteractionSelection {
    }
    export interface NetChartSettingsInteractionZooming extends ItemsChartSettingsInteractionZooming {
        /** Zoom value limits for automatic zooming (for example, "Fit to screen"). Contains array of [min, max] values. */
        autoZoomExtent?: [number, number];
        /** The acceleration of scene movement, when trying to contain all nodes within the view,
        when autozoom is enabled. Increasing the value decreases latency, and makes the animation
        more responsive. Decreasing the value makes the animation more fluid */
        autoZoomPositionEllasticity?: number;
        /** Controls the percentage of how much of the chart width/height the nodes can move around without
        triggering automatic zoom adjustment. A value of 0.9 means that the target is to leave 10% padding
        on all sides of the chart. However once the target  is reached, if the nodes move within these 10%
        on either side, the zoom adjustment is not performed. */
        autoZoomSize?: number;
        /** Auto zoom mode on chart initialization. */
        initialAutoZoom?: string;
        /** Zoom value limits while for manual zooming. Contains array of [min, max] values. */
        zoomExtent?: [number, number];
    }
    export interface NetChartSettingsLayout {
        /** Advanced chart settings. Be advised that they are subject to change, backwards compatibility is not guaranteed. */
        advanced?: {
            adaptiveFreezeTreshold?: number;
        };
        /** Whether to fit network in aspect ratio of chart viewport. Useful for small networks that always fit in chart and are not intended to be zoomed in / out. */
        aspectRatio?: boolean;
        /** Whether to perform global layout on network changes. Use it for better node placement at the cost of chart slowdown on network changes. */
        globalLayoutOnChanges?: boolean;
        /** Maximum time to wait for incremental layout to be completed. Note that bigger value will get nicer placement on network updates at the cost of longer delay. */
        incrementalLayoutMaxTime?: number;
        /** Maximum time to wait for initial layout to be completed. Note that bigger value will get nicer placement of big networks at the cost of long initial delay. */
        initialLayoutMaxTime?: number;
        /** Dynamic layout can be stopped faster if no more movement is detected. */
        layoutFreezeMinTimeout?: number;
        /** Dynamic layout is stopped after user is inactive for this time. */
        layoutFreezeTimeout?: number;
        /** Layout mode. */
        mode?: string;
        /** Desired distance between nodes. */
        nodeSpacing?: number;
        /** Desired vertical distance between node rows in the hierarchy layout. */
        rowSpacing?: number;
        /** For radial layout, whether to lay out the first level in two rings, if necessary */
        twoRingRadialLayout?: boolean;
    }
    export interface NetChartSettingsLegend extends BaseSettingsLegend {
        /** Legend enclosing panel settings. */
        panel?: BaseSettingsLegendPanel;
    }
    export interface NetChartSettingsLocalization extends BaseSettingsLocalization {
        /** Node/link menu by using localizeable strings. */
        menu?: {
            collapse?: string;
            /** The text for the button that unlock the node position. */
            dynamic?: string;
            expand?: string;
            fixed?: string;
            focus?: string;
            hide?: string;
            unfocus?: string;
        };
        /** Strings used in toolbars. */
        toolbar?: NetChartBarSettingsLocalizationToolbar;
    }
    /** Settings for NetChart navigation (expanding/collapsing/focusing/unfocusing/showing/hiding). The main setting is `mode` which determines the overall
    algorithm for navigation. Other parameters can tweak this algorithm, but not all parameters apply to all algorithms. */
    export interface NetChartSettingsNavigation {
        /** Determines what happens if the user has reached maximum number of focus nodes (`numberOfFocusNodes`) and focuses another node.
        If this setting is `true`, then the least recently focused node will be unfocused. If this setting is `false`, then the user
        will not be able to focus the node. _Used by modes: all modes_ */
        autoUnfocus?: boolean;
        /** Whether to auto-zoom to a node when it is focused. _Used by modes: all modes_ */
        autoZoomOnFocus?: boolean;
        /** If focusing a node would display several levels of nodes (due to `focusNodeExpansionRadius` or `focusNodeTailExpansionRadius`), each level is shown after
        the specified delay (milliseconds). Set to 0 to disable. _Used by modes: `focusnodes`_ */
        expandDelay?: number;
        /** Whether to expand node on click. _Used by modes: all modes_ */
        expandOnClick?: boolean;
        /** If set to true, nodes and links with [relevance](full-reference/ItemsChartNode.html#doc_relevance) < 1 will be drawn with a smaller radius and a faded out
        color (both multiplied by [relevance](full-reference/ItemsChartNode.html#doc_relevance)). _Used by modes: `focusnodes`_ */
        focusAutoFadeout?: boolean;
        /** Number of "levels" to automatically expand around the most recently focused node. If set to 1, all nodes directly linked to the focused node will be shown.
        If set to 2, all nodes directly connected to these nodes will be shown as well. Etc. Also used for calculating
        [node relevance](full-reference/ItemsChartNode.html#doc_relevance). _Used by modes: `focusnodes`_ */
        focusNodeExpansionRadius?: number;
        /** Similar to `focusNodeExpansionRadius`, but for the least recently focused node. This allows to create an effect, where the most recently focused node has
        many expanded nodes around it, while the least recently node has only a few (or vice versa). Intermediate focused nodes will have their expansion radius
        linearly interpolated between `focusNodeExpansionRadius` and `focusNodeTailExpansionRadius`. Also used to calculate
        [node relevance](full-reference/ItemsChartNode.html#doc_relevance). _Used by modes: `focusnodes`_ */
        focusNodeTailExpansionRadius?: number;
        /** Initially visible/focused nodes. Array of node identifiers. The precise effect depends on the navigation mode.
        * For `manual` this specifies the initially visible nodes and must contain at least 1 node.
        * For `showall` this specifies which nodes to show first, and other nodes are then requested recursively from these until all nodes are visible.
        * If this setting is left empty or `null`, the chart will directly request ALL nodes (this is more efficient if your data source supports it).
        * For `focusnodes` this specifies the initially focused nodes. The count of node IDs in this array must be between `minNumberOfFocusNodes` and
           `numberOfFocusNodes`
        
        _Used by modes: all modes_ */
        initialNodes?: Array<string>;
        /** Minimum number of focused nodes. Prevents user from unfocusing nodes if there are `minNumberOfFocusNodes` or less nodes focused.
        If the `focusnodes` navigation is used, this setting has a minimum value of 1. _Used by modes: all modes_ */
        minNumberOfFocusNodes?: number;
        /** Navigation mode - the algorithm that determines the expanding/collapsing logic. */
        mode?: string;
        /** Maximum number of focused nodes. The `autoUnfocus` setting determines what happens when more nodes are focused.  _Used by modes: all modes_ */
        numberOfFocusNodes?: number;
    }
    /* tslint:enable */
}

declare module ZoomCharts {
    /* tslint:disable */

    export class NetChart extends Configuration.BaseApi {
        public constructor(settings: Configuration.NetChartSettings);
        /** Adds the given data to whatever data the chart has currently loaded. The chart will automatically be updated
        to display this new data if it falls within the currently visible bounds. */
        public addData(data: Configuration.NetChartDataObject, sourceId?: string): void;
        /** Focuses a node. Whether or not the node will get actually focused depends no the navigation mode. */
        public addFocusNode(
            /** Node ID or object */
            id: (string|Configuration.ItemsChartNode), 
            /** Explicitly assigned relevance (used only by Focusnodes navigation mode).
            For more information, see the [Focusnodes algorithm](net-chart/advanced-topics/focusnodes-algorithm-details.html) */
            relevance?: number): void;
        /** Removes focus from all nodes. The exact effect depends on the navigation mode. */
        public clearFocus(): void;
        /** Collapses a node. The exact effect depends on the navigation mode. */
        public collapseNode(
            /** Node ID or object */
            id: (string|Configuration.ItemsChartNode)): void;
        /** Expands a visible node. */
        public expandNode(
            /** Node ID or object */
            id: (string|Configuration.ItemsChartNode)): void;
        public exportData(visibleOnly?: boolean, exportCoordinates?: boolean): Configuration.NetChartDataObject;
        /** Gets a visible link by its ID */
        public getLink(
            /** Link ID */
            id: string): Configuration.ItemsChartLink;
        /** Gets a visible node by its ID */
        public getNode(
            /** Node ID */
            id: string): Configuration.ItemsChartNode;
        public getNodeDimensions(node: Configuration.ItemsChartNode): {
                x: number;
                y: number;
                radius: number;
                hwidth: number;
            };
        public hideMenu(): NetChart;
        /** Hides a visible node. Whether or not the node will get actually hidden depends on the navigation mode. */
        public hideNode(
            /** Node ID or object */
            id: (string|Configuration.ItemsChartNode)): void;
        public links(): Array<Configuration.ItemsChartLink>;
        /** Fixates a node in place. */
        public lockNode(
            /** Node ID or object */
            id: (string|Configuration.ItemsChartNode), x: number, 
            /** Y position, in scene coordinates */
            y: number): void;
        public nodes(): Array<Configuration.ItemsChartNode>;
        /** Adds event listener. */
        public on(
            /** The type of the event for which the listener will be added. See method overloads for valid values. */
            name: string, 
            /** The callback function. It receives two arguments - the mouse event data and a separate object containing chart specific information. */
            listener: (event: Configuration.BaseMouseEvent, args: Configuration.BaseChartEventArguments) => void): void;
        public on(name: "chartUpdate", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartEventArguments) => void): void;
        public on(name: "click", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartClickEventArguments) => void): void;
        public on(name: "doubleClick", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartClickEventArguments) => void): void;
        public on(name: "error", listener: (
                /** An empty mouse event. */
                event: Configuration.BaseMouseEvent, args: Configuration.BaseChartErrorEventArguments) => void): void;
        public on(name: "hoverChange", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartEventArguments) => void): void;
        public on(name: "positionChange", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartEventArguments) => void): void;
        public on(name: "rightClick", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartClickEventArguments) => void): void;
        public on(name: "selectionChange", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartEventArguments) => void): void;
        public on(name: "settingsChange", listener: (event: Configuration.BaseMouseEvent, args: Configuration.BaseChartSettingsChangeEventArguments) => void): void;
        public on(name: "tripleClick", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartClickEventArguments) => void): void;
        public removeData(data: Configuration.NetChartDataObject, sourceId?: string): void;
        /** Removes focus from a node. Whether or not the node will get actually unfocused depends on the navigation mode. */
        public removeFocusNode(
            /** Node ID or object */
            id: (string|Configuration.ItemsChartNode)): void;
        public replaceData(data: Configuration.NetChartDataObject, sourceId?: string): void;
        /** Updates the chart settings but instead of merging some settings that are arrays or dictionaries (such as `data`)
        these collections are replaced completely. For example, this allows removal of series or value axis within TimeChart. */
        public replaceSettings(changes: Configuration.NetChartSettings): NetChart;
        public resetLayout(): void;
        /** Animates the viewport to zoom into and contain the nodes specified in the given array */
        public scrollIntoView(
            /** Nodes to zoom to */
            nodes: (Array<string>|Array<Configuration.ItemsChartNode>), 
            /** Optionally, additional margins (in scene coordinates) to leave free on the sides. Order: top, right, bottom, left */
            margins?: [number, number, number, number]): void;
        /** Set/Get selected objects. */
        public selection(
            /** array of objects identifiers to select. Do not pass this parameter if you don't want to change current selection. */
            selected: Array<(string|Configuration.ItemsChartNode|Configuration.ItemsChartLink)>): Array<(Configuration.ItemsChartNode|Configuration.ItemsChartLink)>;
        /** Shows a node by its ID. The data for the node gets requested in the standard manner.
        Whether or not the node will get actually shown depends on the navigation mode. */
        public showNode(
            /** Node ID */
            id: string): void;
        /** Lists the predefined themes for the chart. These can be used within the settings objects or via the `customize()` method:
        
        ```javascript 
        var chart = new ZoomCharts.$this({ theme: ZoomCharts.$this.dark });
        chart.updateSettings({ theme: ZoomChart.$this.dark });
        chart.customize("dark");
        ``` */
        public static themes: {
            dark?: Configuration.NetChartSettings;
            flat?: Configuration.NetChartSettings;
        };
        /** Unfixates a node and allows it to be repositioned by the layout algorithms. */
        public unlockNode(
            /** Node ID or object */
            id: (string|Configuration.ItemsChartNode)): void;
        /** Updates the chart settings. Only the settings that have to be changed should be passed. Note that some arrays
        and dictionaries (such as `data`) are merged by the ID values - if instead they should be replaced, use
        [`replaceSettings()`](#doc_replaceSettings) method. */
        public updateSettings(changes: Configuration.NetChartSettings): NetChart;
        /** Updates (recalculates) the style for the whole chart or specific objects matching the given IDs. */
        public updateStyle(
            /** A list of IDs for the nodes and links which need their style recalculated */
            objects?: Array<string>): void;
        public zoom(zoomValue: number): number;
        public zoomIn(objects: Array<string>, animate?: boolean): void;
    }
    /* tslint:enable */
}

declare class NetChart extends ZoomCharts.NetChart { }

declare module ZoomCharts {
    export interface Dictionary<TValue> {
        [key: string]: TValue;
    }

    export interface NumberDictionary<TValue> {
        [key: number]: TValue;
    }

    export interface GradientDefinition extends Array<[number, string]> {
    }

    export interface IRectangle {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
    }

    export interface IGeoRectangle {
        east: number;
        west: number;
        north: number;
        south: number;
    }

    export interface IColor {
        R: number;
        G: number;
        B: number;
        A: number;

        /** The cached result of this color converted to LAB */
        _lab?: { L: number; A: number; B: number; };
    }
}

interface Window {
    /** The name of the license to be used by all charts on the page. This value is usually in form `ZCX-foobar: production license for *.example.org` */
    ZoomChartsLicense: string;
    /** The license key to match the license name. This is a 512 character hexadecimal string. */
    ZoomChartsLicenseKey: string;
}