/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojdatasource-common"],function(e,t,a){"use strict";var n={properties:{context:{type:"object",properties:{datasource:{type:"oj.DataProvider<K, D>"},keys:{type:"object",properties:{row:{type:"K"},column:{type:"K"}}},key:{type:"K"},parentKey:{type:"K"},treeDepth:{type:"number"},isLeaf:{type:"boolean"}}},expanded:{type:"boolean",writeback:!0},translations:{type:"object",value:{},properties:{accessibleLevelDescription:{type:"string"},accessibleRowCollapsed:{type:"string"},accessibleRowDescription:{type:"string"},accessibleRowExpanded:{type:"string"},accessibleStateCollapsed:{type:"string"},accessibleStateExpanded:{type:"string"}}}},methods:{refresh:{},setProperty:{},getProperty:{},setProperties:{},getNodeBySubId:{},getSubIdByNode:{}},events:{ojExpand:{},ojCollapse:{}},extension:{}};e.EmptyNodeSet=function(e,t){this.m_parent=e,this.m_start=t},e.EmptyNodeSet.prototype.getParent=function(){return this.m_parent},e.EmptyNodeSet.prototype.getStart=function(){return this.m_start},e.EmptyNodeSet.prototype.getCount=function(){return 0},e.EmptyNodeSet.prototype.getData=function(e){return null},e.EmptyNodeSet.prototype.getMetadata=function(e){return null},e.FlattenedNodeSet=function(e,t){this.m_nodeSet=e,this.m_start=t},e.FlattenedNodeSet.prototype.getParent=function(){return this.m_nodeSet.getParent()},e.FlattenedNodeSet.prototype.getStart=function(){return null!=this.m_start?this.m_start:this.m_nodeSet.getStart()},e.FlattenedNodeSet.prototype.getCount=function(){return void 0===this.m_count&&(this.m_count=this._getCount(this.m_nodeSet,0),null!=this.m_start&&(this.m_count=this.m_count-this.m_start)),this.m_count},e.FlattenedNodeSet.prototype._getCount=function(e,t){var a=t,n=e.getStart(),s=e.getCount();if(a+=s,e.getChildNodeSet)for(var o=0;o<s;o++){var r=e.getChildNodeSet(o+n);null!=r&&(a=this._getCount(r,a))}return a},e.FlattenedNodeSet.prototype.getData=function(e){return this._getDataOrMetadata(this.m_nodeSet,e,{index:this.m_nodeSet.getStart()},this._getData)},e.FlattenedNodeSet.prototype.getMetadata=function(e){return this._getDataOrMetadata(this.m_nodeSet,e,{index:this.m_nodeSet.getStart()},this._getMetadata)},e.FlattenedNodeSet.prototype._getMetadata=function(e,t){return e.getMetadata(t)},e.FlattenedNodeSet.prototype._getData=function(e,t){return e.getData(t)},e.FlattenedNodeSet.prototype._getDataOrMetadata=function(e,t,a,n){for(var s=e.getStart(),o=e.getCount(),r=0;r<o;r++){var i=a.index;if(i===t)return n.call(this,e,r+s);if(a.index=i+1,e.getChildNodeSet){var d=e.getChildNodeSet(r+s);if(null!=d){var l=this._getDataOrMetadata(d,t,a,n);if(null!=l)return l}}}return null},e.MergedNodeSet=function(e,t,a){this.m_nodeSet1=e,this.m_nodeSet2=t,this.m_mergeAt=this._findIndex(a)},e.MergedNodeSet.prototype._findIndex=function(e){for(var t=this.m_nodeSet1.getStart(),a=t+this.m_nodeSet1.getCount(),n=t;n<a;n++){if(e===this.m_nodeSet1.getMetadata(n).key)return n}return a-1},e.MergedNodeSet.prototype.getParent=function(){return this.m_nodeSet1.getParent()},e.MergedNodeSet.prototype.getStart=function(){return this.m_nodeSet1.getStart()},e.MergedNodeSet.prototype.getCount=function(){return this.m_nodeSet1.getCount()+this.m_nodeSet2.getCount()},e.MergedNodeSet.prototype.getData=function(e){var t=this._getRelativeIndex(e),a=t.set,n=t.index;return a.getData(n)},e.MergedNodeSet.prototype.getMetadata=function(e){var t=this._getRelativeIndex(e),a=t.set,n=t.index;return a.getMetadata(n)},e.MergedNodeSet.prototype._getRelativeIndex=function(e){if(e<=this.m_mergeAt)return{set:this.m_nodeSet1,index:e};var t=this.m_nodeSet2.getCount();return e>this.m_mergeAt+t?{set:this.m_nodeSet1,index:e-t}:{set:this.m_nodeSet2,index:e-this.m_mergeAt-1+this.m_nodeSet2.getStart()}},e.NodeSetWrapper=function(e,t,a,n){this.m_nodeSet=e,this.m_callback=t,this.m_range=a,this.m_collapsedKeys=n},e.NodeSetWrapper.prototype.getParent=function(){return this.m_nodeSet.getParent()},e.NodeSetWrapper.prototype.getStart=function(){return null!=this.m_range?this.m_range.start:this.m_nodeSet.getStart()},e.NodeSetWrapper.prototype.getCount=function(){var e=this.m_nodeSet.getStart(),t=this.m_nodeSet.getCount();return null!=this.m_range&&(t=Math.min(this.m_range.count,t),this.m_range.start<e&&(t=0)),t},e.NodeSetWrapper.prototype.getData=function(e){return this.m_nodeSet.getData(this._getRelativeIndex(e))},e.NodeSetWrapper.prototype.getMetadata=function(e){var t=this.m_nodeSet.getMetadata(this._getRelativeIndex(e));t.index=e,t.parentKey=this.getParent();var a=t.key;return this.m_callback.call(null,a,t),t},e.NodeSetWrapper.prototype.getChildNodeSet=function(t){if((null==this.m_collapsedKeys||-1===this.m_collapsedKeys.indexOf(this.m_nodeSet.getMetadata(t).key))&&this.m_nodeSet.getChildNodeSet){var a=this.m_nodeSet.getChildNodeSet(t);if(null!=a)return new e.NodeSetWrapper(a,this.m_callback,null,this.m_collapsedKeys)}return null},e.NodeSetWrapper.prototype._getRelativeIndex=function(e){return null==this.m_range?e:e-this.m_range.start+this.m_nodeSet.getStart()},e.FlattenedTreeDataSource=function(t,a){this.m_wrapped=t,this.m_options=a||{},e.FlattenedTreeDataSource.superclass.constructor.call(this)},e.Object.createSubclass(e.FlattenedTreeDataSource,e.DataSource,"oj.FlattenedTreeDataSource"),e.FlattenedTreeDataSource.prototype.Init=function(){e.FlattenedTreeDataSource.superclass.Init.call(this),this.m_wrapped.on("change",this._handleModelEvent.bind(this)),this.m_busy=!1,this.m_fetchSize=parseInt(this.m_options.fetchSize,10),isNaN(this.m_fetchSize)&&(this.m_fetchSize=25),this.m_maxCount=parseInt(this.m_options.maxCount,10),isNaN(this.m_maxCount)&&(this.m_maxCount=500);var t=this.m_options.expanded;Array.isArray(t)?this.m_expandedKeys=t:("all"===t&&(this.m_collapsedKeys=[]),this.m_expandedKeys=[]),this.m_cache=[]},e.FlattenedTreeDataSource.prototype.handleEvent=function(t,a){return e.FlattenedTreeDataSource.superclass.handleEvent.call(this,t,a)},e.FlattenedTreeDataSource.prototype.Destroy=function(){delete this.m_cache,delete this.m_expandedKeys,delete this.m_collapsedKeys,this.m_queue&&delete this.m_queue,this.m_wrapped.off("change"),this.m_wrapped.Destroy&&this.m_wrapped.Destroy()},e.FlattenedTreeDataSource.prototype.getFetchSize=function(){return this.m_fetchSize},e.FlattenedTreeDataSource.prototype.getMaxCount=function(){return this.m_maxCount},e.FlattenedTreeDataSource.prototype.getExpandedKeys=function(){return this.m_expandedKeys},e.FlattenedTreeDataSource.prototype.getOption=function(e){return null!=this.m_options?this.m_options[e]:null},e.FlattenedTreeDataSource.prototype.getWrappedDataSource=function(){return this.m_wrapped},e.FlattenedTreeDataSource.prototype._getFetchSizeToUse=function(e){var t=this.getFetchSize(),a=this.getMaxCount();return-1===t?-1===e?a:e:-1===e?Math.min(t,a):t},e.FlattenedTreeDataSource.prototype.fetchRows=function(e,t){this.m_busy=!0,this._isExpandAll()?this._fetchRowsFromDescendants(e,t):this._fetchRowsFromChildren(e,t)},e.FlattenedTreeDataSource.prototype._fetchRowsFromChildren=function(t,a){var n;if(t.start>this._getLastIndex()){var s=this._getMaxFetchSize();if(this._getLastIndex()<0)return(n={}).start=t.start,n.count=Math.min(s,t.count),void this.m_wrapped.fetchChildren(null,n,{success:function(e){this._handleFetchSuccess(e,null,0,t,n,0,a)}.bind(this),error:function(e){this._handleFetchError(e,a)}.bind(this)});if(s>0){var o=this._getLastEntry(),r=o.parent,i=this.m_wrapped.getChildCount(r),d=o.index,l=o.depth;if(-1===i||d<i-1){var h=this._getFetchSizeToUse(i);(n={}).start=d+1,n.count=-1===i?Math.min(h,t.count):Math.min(s,Math.min(Math.min(h,t.count),i-n.start)),this.m_wrapped.fetchChildren(r,n,{success:function(e){this._handleFetchSuccess(e,r,l,t,n,i,a)}.bind(this),error:function(e){this._handleFetchError(e,a)}.bind(this)})}else{var c=o.key,p=this.m_wrapped.getChildCount(c);if(!(this._isExpanded(c)&&(-1===p||p>0)?this._fetchFromAncestors(o,l+1,t,a,s):this._fetchFromAncestors(r,l,t,a,s))){var u=new e.EmptyNodeSet(null,t.start);null!=a&&null!=a.success&&a.success.call(null,u),this.m_busy=!1}}return}}this.handleMaxCountReached(t,a),this.m_busy=!1},e.FlattenedTreeDataSource.prototype.moveOK=function(e,t,a){return this.m_wrapped.moveOK(e,t,a)},e.FlattenedTreeDataSource.prototype.move=function(e,t,a,n){this.m_wrapped.move(e,t,a,n)},e.FlattenedTreeDataSource.prototype._getMaxFetchSize=function(){return this.getMaxCount()-(this._getLastIndex()+1)},e.FlattenedTreeDataSource.prototype._handleFetchError=function(e,t){null!=t&&null!=t.error&&t.error.call(null,e),this.m_busy=!1},e.FlattenedTreeDataSource.prototype._handleFetchSuccess=function(t,a,n,s,o,r,i,d){var l=[];this._processNodeSet(t,a,n,l);var h={start:s.start,count:t.getCount()};if(t=new e.NodeSetWrapper(t,this.insertMetadata.bind(this),h),0!==l.length){var c=[];c.push(l);var p={};p.callbacks={success:function(e){this._verifyFetchResults(e,a,n,s,o,r,i,d)}.bind(this),error:function(e){this._handleFetchError(e,i)}.bind(this)},p.nodeSet=t,p.keys=[],this._syncExpandRows(c,p)}else this._verifyFetchResults(t,a,n,s,o,r,i,d)},e.FlattenedTreeDataSource.prototype._verifyFetchResults=function(t,a,n,s,o,r,i,d){var l,h;if(null!=d){var c=d.prevNodeSet;if(null!=c){var p=c.getStart()+c.getCount()-1,u=c.getMetadata(p).key;l=new e.MergedNodeSet(c,t,u)}}if(t.getCount()<s.count&&null!=a&&n>0){var _={};_.start=s.start+t.getCount(),_.count=s.count-t.getCount();var y={};y.prevNodeSet=null==l?t:l,h=this._fetchFromAncestors(a,n,_,i,void 0,y)}else if(t.getCount()>s.count){var g=t.getCount()-s.count;null!=l?(l=new e.NodeSetWrapper(l,this.insertMetadata.bind(this),{start:l.getStart(),count:l.getCount()-g}),this._removeEntry(l.getStart()+l.getCount(),g)):(t=new e.NodeSetWrapper(t,this.insertMetadata.bind(this),{start:t.getStart(),count:t.getCount()-g}),this._removeEntry(t.getStart()+t.getCount(),g))}h||null!=i&&null!=i.success&&i.success.call(null,null==l?t:l),this.m_busy=!1},e.FlattenedTreeDataSource.prototype.getChildCount=function(e){return this.m_wrapped.getChildCount(e)},e.FlattenedTreeDataSource.prototype._fetchFromAncestors=function(e,t,a,n,s,o){var r,i=!1;void 0===s&&(s=this._getMaxFetchSize()),this._isBatchFetching()&&(r={queueOnly:!0});for(var d,l,h,c=this._getFetchSizeToUse(-1),p=this._getLastIndex();p>=0;p--){var u=this._getEntry(p);if((h=u.depth)<t){e=u.parent,d=this.m_wrapped.getChildCount(e);var _=u.index,y=-1===d;if(y||_<d-1){if((l={}).start=_+1,y?(l.count=Math.min(s,Math.max(0,c)),r=void 0):l.count=Math.min(s,Math.min(c,d-l.start)),0===l.count)break;this.m_wrapped.fetchChildren(e,l,{success:function(e,t,s,r,i){this._handleFetchSuccess(i,e,t,a,s,r,n,o)}.bind(this,e,h,l,d),error:function(e){this._handleFetchError(e,n)}.bind(this)},r),i=!0;break}t-=1}}return null!=r&&(this.m_wrapped.fetchChildren(e,{start:a.count,count:0},{success:function(t){this._handleFetchSuccess(t,e,h,a,l,d,n,o)}.bind(this),error:function(e){this._handleFetchError(e,n)}.bind(this)}),i=!0),i},e.FlattenedTreeDataSource.prototype._processNodeSet=function(e,t,a,n){for(var s=e.getStart(),o=e.getCount(),r=0;r<o;r++){var i=e.getMetadata(s+r).key;this._addEntry(i,a,s+r,t),this._isExpanded(i)&&n.push(i)}},e.FlattenedTreeDataSource.prototype.insertMetadata=function(e,t){this._isExpanded(e)&&!t.leaf?t.state="expanded":t.leaf?t.state="leaf":t.state="collapsed"},e.FlattenedTreeDataSource.prototype._fetchRowsFromDescendants=function(e,t){var a={maxCount:this.getMaxCount()};this._getLastIndex()>=0&&(a.start=this._getEntry(this._getLastIndex()).key),this.m_wrapped.fetchDescendants(null,{success:function(a){this._handleFetchDescendantsSuccess(a,e,t)}.bind(this),error:function(e){this._handleFetchError(e,t)}.bind(this)},a)},e.FlattenedTreeDataSource.prototype.getSortCriteria=function(){return this.m_wrapped.getSortCriteria()},e.FlattenedTreeDataSource.prototype._handleFetchDescendantsSuccess=function(t,a,n){var s,o,r=t;if(a.start>this._getLastIndex()){var i=this._getMaxFetchSize(),d=Math.min(i,a.count);if(r=new e.NodeSetWrapper(r,this.insertMetadata.bind(this),null,this.m_collapsedKeys),this._getLastIndex()>=0){var l=this._getLastEntry();s={index:0,found:!1,count:0},this._processDescendantsNodeSet(r,null,0,l,d,s),o=s.index+1}else s={count:0},this._processDescendantsNodeSet(r,null,0,null,d,s),o=0;null!=n&&null!=n.success&&(r=null!=s?0===s.count?new e.EmptyNodeSet(null,a.start):new e.FlattenedNodeSet(r,o):new e.FlattenedNodeSet(r),n.success.call(null,r))}else this.handleMaxCountReached(a,n);this.m_busy=!1,this._processQueue()},e.FlattenedTreeDataSource.prototype._processDescendantsNodeSet=function(e,t,a,n,s,o){for(var r=e.getStart(),i=e.getCount(),d=0;d<i;d++){if(o.count===s)return;var l=e.getMetadata(r+d),h=l.key;if(o.checkDepth&&n.depth>=a&&(o.found=!0,o.checkDepth=!1),(null==n||o.found)&&(this._addEntry(h,a,r+d,t),o.count+=1,l.leaf?l.state="leaf":l.state="expanded"),null==n||o.found||(h===n.key?l.leaf||this._isExpanded(h)?o.found=!0:o.checkDepth=!0:o.index+=1),e.getChildNodeSet&&this._isExpanded(h)){var c=e.getChildNodeSet(d);null!=c&&this._processDescendantsNodeSet(c,h,a+1,n,s,o)}}},e.FlattenedTreeDataSource.prototype.expand=function(e){this._expand(e)},e.FlattenedTreeDataSource.prototype._expand=function(t,a){this.m_busy=!0;var n=this.m_wrapped.getChildCount(t),s=this._getFetchSizeToUse(n),o=this.getMaxCount();if(this._getLastIndex()+1===o&&this.getIndex(t)===o-1)return void this.handleExpandSuccess(t,new e.EmptyNodeSet(t,0),0,a);0!==s?this.m_wrapped.fetchChildren(t,{start:0,count:s},{success:function(e){this.handleExpandSuccess(t,e,n,a)}.bind(this),error:function(e){this.handleExpandError(t,e)}.bind(this)}):this.handleExpandSuccess(t,new e.EmptyNodeSet(t,0),0,a)},e.FlattenedTreeDataSource.prototype._processQueue=function(){if(this.m_queue&&this.m_queue.length>0){for(var e=this.m_queue.length-1;e>=0;e--){var t=this.m_queue[e];this.collapse(t.key)}this.m_queue.length=0}},e.FlattenedTreeDataSource.prototype._queueOp=function(e,t){null==this.m_queue&&(this.m_queue=[]),this.m_queue.push({op:e,key:t})},e.FlattenedTreeDataSource.prototype.collapse=function(e){if(this.m_busy)this._queueOp("collapse",e);else{var t=this.getIndex(e)+1,a=this._getEntry(t-1);if(null!=a){for(var n=0,s=a.depth,o=this._getLastIndex(),r=t;r<o+1;r++){var i=this._getEntry(r).depth;if(i>s)n+=1;else if(i===s)break}if(0!==n){this._isExpandAll()?this.m_collapsedKeys.push(e):this._removeExpanded(e);for(var d=[],l=0;l<n;l++)d.push({key:this._getEntry(t+l).key,index:t+l});this._removeEntry(t,n),this.removeRows(d),this.handleEvent("collapse",{rowKey:e})}else this.handleEvent("collapse",{rowKey:e})}}},e.FlattenedTreeDataSource.prototype._isExpanded=function(e){return this._isExpandAll()?!(this.m_collapsedKeys&&this.m_collapsedKeys.length>0)||-1===this._getCollapsedKeyIndex(e):!!(this.m_expandedKeys&&this.m_expandedKeys.length>0)&&this._getExpandedKeyIndex(e)>-1},e.FlattenedTreeDataSource.prototype._getCollapsedKeyIndex=function(e){return this._getKeyIndex(this.m_collapsedKeys,e)},e.FlattenedTreeDataSource.prototype._getExpandedKeyIndex=function(e){return this._getKeyIndex(this.m_expandedKeys,e)},e.FlattenedTreeDataSource.prototype._getKeyIndex=function(e,t){for(var a=-1,n=0;n<e.length;n++)e[n]===t&&(a=n);return a},e.FlattenedTreeDataSource.prototype._removeExpanded=function(e){var t=this._getExpandedKeyIndex(e);t>-1&&this.m_expandedKeys.splice(t,1)},e.FlattenedTreeDataSource.prototype._removeCollapsed=function(e){var t=this._getCollapsedKeyIndex(e);t>-1&&this.m_collapsedKeys.splice(t,1)},e.FlattenedTreeDataSource.prototype.handleExpandError=function(e,t){this.handleEvent("expand",{rowKey:e})},e.FlattenedTreeDataSource.prototype.handleExpandSuccess=function(t,a,n,s){var o,r;a=new e.NodeSetWrapper(a,this.insertMetadata.bind(this));for(var i=this.getIndex(t)+1,d=i,l=a.getStart(),h=a.getCount(),c=this._getEntry(i-1),p=c.depth+1,u=[],_=l;_<h;_++){var y=a.getMetadata(_),g=y.key;this._isExpanded(g)&&u.push(g),this._insertRow(i,y,c.key,_,p),i+=1}if(this._isExpandAll()?this._removeCollapsed(t):-1===this.m_expandedKeys.indexOf(t)&&this.m_expandedKeys.push(t),null!=s&&(o=s.queue,r=s.prevNodeSetInfo),null!=r&&(a=new e.MergedNodeSet(r.nodeSet,a,t)),0===u.length&&(void 0===o||0===o.length)){if(null!=r){var f=r.callbacks;if(null!=f)return f.success.call(null,a),void(this.m_busy=!1);this.insertRows(r.firstIndex,r.firstKey,a)}else this.insertRows(d,t,a);var m=this.getMaxCount();if(-1===n&&h===this.getFetchSize()||n>h||i===m?this._deleteAllRowsBelow(i):this._getLastIndex()>=m&&this._deleteAllRowsBelow(m),null!=r)for(var S=0;S<r.keys.length;S++)this.handleEvent("expand",{rowKey:r.keys[S]});this.m_busy=!1,this.handleEvent("expand",{rowKey:t})}else void 0===o&&(o=[]),u.length>0&&o.push(u),void 0===r&&((r={}).firstIndex=d,r.firstKey=t,r.keys=[]),r.nodeSet=a,r.keys.push(t),this._syncExpandRows(o,r);this.m_busy=!1,o&&0===o.length&&this._processQueue()},e.FlattenedTreeDataSource.prototype._syncExpandRows=function(e,t){var a=e[e.length-1],n=a.shift();0===a.length&&e.pop(),this._expand(n,{prevNodeSetInfo:t,queue:e})},e.FlattenedTreeDataSource.prototype._insertRow=function(e,t,a,n,s){var o=t.key;e<=this._getLastIndex()?this._addEntry(o,s,n,a,e):this._addEntry(o,s,n,a)},e.FlattenedTreeDataSource.prototype._deleteAllRowsBelow=function(e,t){var a=t;null==t&&(a=this._getLastIndex()+1-e);for(var n=[],s=0;s<a;s++)n.push({key:this._getEntry(e+s).key,index:e+s});this._removeEntry(e,a),this.removeRows(n)},e.FlattenedTreeDataSource.prototype._handleModelEvent=function(e){var t,a=e.operation,n=e.parent;t=Array.isArray(n)?n[n.length-1]:n;var s=e.index;"insert"===a?this._handleInsertEvent(t,s,e.data):"delete"===a?this._handleDeleteEvent(t,s):"refresh"===a&&this._handleRefreshEvent(t)},e.FlattenedTreeDataSource.prototype._handleInsertEvent=function(e,t,a){var n=this.getIndex(e),s=this._getEntry(n).depth+1,o=n+t+1,r=a.getMetadata(a.getStart());this._insertRow(o,r,e,t,s)},e.FlattenedTreeDataSource.prototype._handleDeleteEvent=function(t,a){var n=this.getIndex(t),s=this._getEntry(n),o=n+a,r=this._getEntry(o);e.Assert.assert(r.parent===s&&r.depth===s.depth+1);for(var i=o+1,d=this._getLastIndex();i<=d;){if(this._getEntry(i).depth!==r.depth)break;i+=1}this._deleteAllRowsBelow(o,1)},e.FlattenedTreeDataSource.prototype._handleRefreshEvent=function(e){null==e&&this.refresh()},e.FlattenedTreeDataSource.prototype._isExpandAll=function(){var e=this.m_wrapped.getCapability("fetchDescendants");return null!=this.m_collapsedKeys&&null!=e&&"disable"!==e},e.FlattenedTreeDataSource.prototype._isBatchFetching=function(){return"enable"===this.m_wrapped.getCapability("batchFetch")},e.FlattenedTreeDataSource.prototype.refresh=function(){this._clearAll()},e.FlattenedTreeDataSource.prototype.getIndex=function(e){for(var t=this._getLastIndex(),a=0;a<=t;a++){if(this._getEntry(a).key===e)return a}return-1},e.FlattenedTreeDataSource.prototype.getKey=function(e){return e<0||e>this._getLastIndex()?null:this._getEntry(e).key},e.FlattenedTreeDataSource.prototype.getFetchedRange=function(){return{start:0,end:this._getLastIndex()+1}},e.FlattenedTreeDataSource.prototype.getAncestors=function(e){for(var t=[],a=this.getIndex(e),n=this._getParent(a);null!=n;)t.push(n),a=this.getIndex(n),n=this._getParent(a);return t.reverse()},e.FlattenedTreeDataSource.prototype.handleMaxCountReached=function(e,t){null!=t&&null!=t.error&&t.error.call(null)},e.FlattenedTreeDataSource.prototype.insertRows=function(t,a,n){e.Assert.failedInAbstractFunction()},e.FlattenedTreeDataSource.prototype.removeRows=function(t){e.Assert.failedInAbstractFunction()},e.FlattenedTreeDataSource.prototype._getLastIndex=function(){return this.m_cache.length-1},e.FlattenedTreeDataSource.prototype._getLastEntry=function(){return this.m_cache[this._getLastIndex()]},e.FlattenedTreeDataSource.prototype._getEntry=function(e){return this.m_cache[e]},e.FlattenedTreeDataSource.prototype._getParent=function(e){var t=this.m_cache[e];return null!=t?t.parent:null},e.FlattenedTreeDataSource.prototype._addEntry=function(e,t,a,n,s){var o={};o.key=e,o.depth=t,o.index=a,o.parent=n,void 0===s?this.m_cache.push(o):this.m_cache.splice(s,0,o)},e.FlattenedTreeDataSource.prototype._removeEntry=function(e,t){this.m_cache.splice(e,t)},e.FlattenedTreeDataSource.prototype._clearAll=function(){this.m_cache.length=0},e.FlattenedTreeDataSource.prototype.getCapability=function(e){return this.m_wrapped.getCapability(e)},e.__registerWidget("oj.ojRowExpander",t.oj.baseComponent,{version:"1.0.0",widgetEventPrefix:"oj",options:{context:null,expanded:null,expand:null,collapse:null},classNames:{root:"oj-rowexpander",icon:"oj-component-icon",clickable:"oj-clickable-icon-nocontext",expand:"oj-rowexpander-expand-icon",collapse:"oj-rowexpander-collapse-icon",leaf:"oj-rowexpander-leaf-icon",lazyload:"oj-rowexpander-lazyload-icon",toucharea:"oj-rowexpander-touch-area",indent:"oj-rowexpander-indent",iconspacer:"oj-rowexpander-icon-spacer",depth0:"oj-rowexpander-depth-0",depth1:"oj-rowexpander-depth-1",depth2:"oj-rowexpander-depth-2",depth3:"oj-rowexpander-depth-3",depth4:"oj-rowexpander-depth-4",depth5:"oj-rowexpander-depth-5",depth6:"oj-rowexpander-depth-6",depth7:"oj-rowexpander-depth-7"},constants:{MAX_STYLE_DEPTH:7,NUM5_KEY:53},_ComponentCreate:function(){this._super(),this.element.addClass(this.classNames.root),this._initContent()},_initContent:function(){var n=this,s=this.options.context;if(null!=s.component)this.component="function"==typeof s.component?s.component("instance"):s.component;else if(s.componentElement){var o=s.componentElement;o=t(o).hasClass("oj-component-initnode")?o:t(o).find(".oj-component-initnode")[0],this.component=a.__GetWidgetConstructor(o)("instance")}this.datasource=s.datasource,e.DataProviderFeatureChecker.isDataProvider(this.datasource)&&this._subscribeToDataProvider(),this.depth=e.DataProviderFeatureChecker.isDataProvider(this.datasource)?s.treeDepth+1:s.depth,this.rowKey=s.key,s.state?this.iconState=s.state:s.isLeaf?this.iconState="leaf":this.iconState=this._getDataProviderExpanded().has(this.rowKey)?"expanded":"collapsed",this.index=e.DataProviderFeatureChecker.isDataProvider(this.datasource)?s.indexFromParent:s.index,this.parentKey=s.parentKey,this._addIndentation(),this._addIcon(),this._setIconStateClass(),"expanded"===this.iconState||"collapsed"===this.iconState?(t(this.toucharea).on("touchend",function(e){e.preventDefault(),n._fireExpandCollapse()}),t(this.toucharea).on("click",function(e){e.preventDefault(),n._fireExpandCollapse()}),t(this.element).on("keypress",function(e){var a=e.keyCode||e.which;a!==t.ui.keyCode.ENTER&&a!==t.ui.keyCode.SPACE||(n._fireExpandCollapse(),e.preventDefault(),e.target.focus())}),this.handleKeyDownCallback=this._handleKeyDownEvent.bind(this),this.component.element.get(0).addEventListener("keydown",this.handleKeyDownCallback,!0),this.handleExpandCallback=this._handleExpandEvent.bind(this),this.handleCollapseCallback=this._handleCollapseEvent.bind(this),e.DataProviderFeatureChecker.isDataProvider(this.datasource)||(this.datasource.on("expand",this.handleExpandCallback,this),this.datasource.on("collapse",this.handleCollapseCallback,this)),this._initExpanded()):"leaf"===this.iconState&&(this.handleKeyDownCallback=this._handleKeyDownEvent.bind(this),this.component.element.get(0).addEventListener("keydown",this.handleKeyDownCallback,!0),t(this.icon).attr("tabindex",-1)),this.handleActiveKeyChangeCallback=this._handleActiveKeyChangeEvent.bind(this),this.component._IsCustomElement()?t(this.component.element).on("ojBeforeCurrentCell",this.handleActiveKeyChangeCallback):t(this.component.element).on("ojbeforecurrentcell",this.handleActiveKeyChangeCallback)},_initExpanded:function(){if(!e.DataProviderFeatureChecker.isDataProvider(this.datasource)){var t=this.options.expanded;null!=t?t&&"collapsed"===this.iconState?this._expand():t||"expanded"!==this.iconState||this._collapse():this.options.expanded="collapsed"!==this.iconState}},_getDataProviderExpanded:function(){return this._dataSourceExpanded},_getFlattenedDataProvider:function(){return this.datasource.getExpandedObservable?this.datasource:this.datasource.dataProvider},_getChildCount:function(t){return e.DataProviderFeatureChecker.isDataProvider(this.datasource)?(null!=t?this._getFlattenedDataProvider().dataProvider.getChildDataProvider(this.parentKey):this._getFlattenedDataProvider().dataProvider).getTotalSize():this.datasource.getWrappedDataSource().getChildCount(this.parentKey)},refresh:function(){this.element.empty(),this._initContent()},_destroy:function(){this.component.element.get(0).removeEventListener("ojkeydown",this.handleKeyDownCallback,!0),t(this.component.element).off("ojbeforecurrentcell",this.handleActiveKeyChangeCallback),e.DataProviderFeatureChecker.isDataProvider(this.datasource)?this._dataProviderSubscription.unsubscribe():(this.datasource.off("expand",this.handleExpandCallback,this),this.datasource.off("collapse",this.handleCollapseCallback,this)),this.element.removeClass(this.classNames.root),this.element.empty()},_subscribeToDataProvider:function(){var e=this,t=this._getFlattenedDataProvider().getExpandedObservable();e._dataProviderSubscription=t.subscribe(function(t){var a=!1,n=!1;if(e._dataSourceExpanded=t.value,"expanded"!==e.iconState||e._dataSourceExpanded.has(e.rowKey)||(a=!0,e._loading()),"collapsed"===e.iconState&&e._dataSourceExpanded.has(e.rowKey)&&(n=!0,e._loading()),n||a){var s=t.completionPromise;s&&s.then(function(){n&&e._handleExpandEvent({rowKey:e.rowKey}),a&&e._handleCollapseEvent({rowKey:e.rowKey})})}})},_expand:function(){return"collapsed"===this.iconState&&(this._loading(),e.DataProviderFeatureChecker.isDataProvider(this.datasource)?this._getFlattenedDataProvider().setExpanded(this._getDataProviderExpanded().add([this.rowKey])):this.datasource.expand(this.rowKey),!0)},_collapse:function(){return"expanded"===this.iconState&&(this._loading(),e.DataProviderFeatureChecker.isDataProvider(this.datasource)?this._getFlattenedDataProvider().setExpanded(this._getDataProviderExpanded().delete([this.rowKey])):this.datasource.collapse(this.rowKey),!0)},_setOption:function(t,a,n){"expanded"!==t||e.DataProviderFeatureChecker.isDataProvider(this.datasource)||null!=n._context&&!0===n._context.internalSet?(this._super(t,a,n),"context"===t&&null!=n._context&&!0!==n._context.internalSet&&this.refresh()):a?this._expand():this._collapse()},_addIndentation:function(){var e=this.depth-1;if(e<this.constants.MAX_STYLE_DEPTH)this._appendSpacer(e);else{for(var t=1;t<=e/this.constants.MAX_STYLE_DEPTH;t++)this._appendSpacer(this.constants.MAX_STYLE_DEPTH);var a=e%this.constants.MAX_STYLE_DEPTH;a<this.constants.MAX_STYLE_DEPTH&&this._appendSpacer(a)}},_appendSpacer:function(e){var a=t(document.createElement("span")).addClass(this.classNames.indent).addClass(this.classNames["depth"+e]);this.element.append(a)},_addIcon:function(){var e=t(document.createElement("div")).addClass(this.classNames.iconspacer);this.toucharea=t(document.createElement("div")).addClass(this.classNames.toucharea),this.icon=t(document.createElement("a")).attr("href","leaf"===this.iconState?"":"#").attr("aria-labelledby",this._getLabelledBy()).addClass(this.classNames.icon).addClass(this.classNames.clickable).attr("aria-label",this.getTranslatedString("accessibleLevelDescription",{level:this.depth})),this.element.append(e.append(this.toucharea.append(this.icon)));this._focusable({element:this.icon,applyHighlight:!0})},_addIconClass:function(e){this.icon.addClass(this.classNames[e])},_removeIconClass:function(e){this.icon.removeClass(this.classNames[e])},_setIconStateClass:function(){switch(this.iconState){case"leaf":this._removeIconClass("icon"),this._removeIconClass("clickable"),this._addIconClass("leaf");break;case"collapsed":this._addIconClass("expand"),this._ariaExpanded(!1);break;case"expanded":this._addIconClass("collapse"),this._ariaExpanded(!0);break;case"loading":this._removeIconClass("clickable"),this._addIconClass("lazyload")}},_removeIconStateClass:function(){switch(this.iconState){case"leaf":this._removeIconClass("leaf"),this._addIconClass("icon"),this._addIconClass("clickable");break;case"collapsed":this._removeIconClass("expand");break;case"expanded":this._removeIconClass("collapse");break;case"loading":this._removeIconClass("lazyload"),this._addIconClass("clickable")}},_handleActiveKeyChangeEvent:function(e,t){var a;if(null==t&&(t=e.detail),null!=t.currentCell){var n="cell"===t.currentCell.type?t.currentCell.keys.row:t.currentCell.key;if(null!=t.previousValue&&(a="cell"===t.previousCurrentCell.type?t.previousCurrentCell.keys.row:t.previousCurrentCell.key),this.rowKey===n&&a!==n&&this.component._setAccessibleContext){var s,o=this.getTranslatedString("accessibleRowDescription",{level:this.depth,num:this.index+1,total:this._getChildCount(this.parentKey)});s="collapsed"===this.iconState?this.getTranslatedString("accessibleStateCollapsed"):"expanded"===this.iconState?this.getTranslatedString("accessibleStateExpanded"):"",this.component._setAccessibleContext({context:o,state:s})}}},_handleKeyDownEvent:function(n){var s=a.__GetWidgetConstructor(this.component.element.get(0))("getContextByNode",n.target);if(null!=s){var o=s.key;if(null==o&&(o=s.keys.row),this.rowKey===o){var r=n.keyCode||n.which;if(e.DomUtils.isMetaKeyPressed(n))if(r===t.ui.keyCode.RIGHT)this._expand()&&n.preventDefault();else if(r===t.ui.keyCode.LEFT)this._collapse()&&n.preventDefault();else if(n.altKey&&r===this.constants.NUM5_KEY&&this.component._setAccessibleContext){var i;if(!e.DataProviderFeatureChecker.isDataProvider(this.datasource)){var d=this.datasource.getAncestors(this.rowKey);if(null!=d&&d.length>0){i=[];for(var l=0;l<d.length;l++)i.push({key:d[l],label:this.getTranslatedString("accessibleLevelDescription",{level:l+1})})}}var h=this.getTranslatedString("accessibleRowDescription",{level:this.depth,num:this.index+1,total:this._getChildCount(this.parentKey)});this.component._setAccessibleContext({context:h,state:"",ancestors:i})}}}},_loading:function(){this._removeIconStateClass(),this.iconState="loading",this._setIconStateClass()},_handleExpandEvent:function(e){var t=e.rowKey?e.rowKey:e.detail.key;if(t===this.rowKey){this._removeIconStateClass(),this.iconState="expanded",this._setIconStateClass(),this._ariaExpanded(!0),this._updateContextState("expanded");var a=this.options.expanded;(null==a||null!=a&&!a)&&(this._trigger("expand",null,{rowKey:t}),this._updateExpandedState(!0))}},_handleCollapseEvent:function(e){var t=e.rowKey?e.rowKey:e.detail.key;if(t===this.rowKey){this._removeIconStateClass(),this.iconState="collapsed",this._setIconStateClass(),this._ariaExpanded(!1),this._updateContextState("collapsed");var a=this.options.expanded;(null==a||null!=a&&a)&&(this._trigger("collapse",null,{rowKey:t}),this._updateExpandedState(!1))}},_updateExpandedState:function(e){this.option("expanded",e,{changed:!0,_context:{internalSet:!0,writeback:!0}})},_updateContextState:function(e){var t=this.options.context;t.state=e,this.option("context",t,{changed:!0,_context:{internalSet:!0}})},_fireExpandCollapse:function(){var t=this.iconState;e.DataProviderFeatureChecker.isDataProvider(this.datasource)||this._loading(),"collapsed"===t?e.DataProviderFeatureChecker.isDataProvider(this.datasource)?this._getFlattenedDataProvider().setExpanded(this._getDataProviderExpanded().add([this.rowKey])):this.datasource.expand(this.rowKey):"expanded"===t&&(e.DataProviderFeatureChecker.isDataProvider(this.datasource)?this._getFlattenedDataProvider().setExpanded(this._getDataProviderExpanded().delete([this.rowKey])):this.datasource.collapse(this.rowKey))},_ariaExpanded:function(e){this.icon.attr("aria-expanded",e)},getNodeBySubId:function(e){if(null==e)return this.element?this.element[0]:null;var t=e.subId;return"oj-rowexpander-disclosure"!==t&&"oj-rowexpander-icon"!==t||null==this.icon?null:this.icon.get(0)},getSubIdByNode:function(e){return e===this.icon.get(0)?{subId:"oj-rowexpander-disclosure"}:null},_NotifyAttached:function(){this._super(),this.icon.attr("aria-labelledby",this._getLabelledBy())},_getLabelledBy:function(){return this.element.parent().closest("[id]").attr("id")}}),n.extension._WIDGET_NAME="ojRowExpander",e.CustomElementBridge.register("oj-row-expander",{metadata:n})});