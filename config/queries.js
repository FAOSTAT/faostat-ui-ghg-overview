/*global define*/
define([], function () {

    'use strict';

    return {

        "world_total" : {
            "sql" : {
                "query" : " SELECT E.UnitName{{LANG}}, {{AGGREGATION}}(D.Value) FROM Data AS D, Element E WHERE D.DomainCode = {{DOMAINCODE}} AND D.AreaCode IN ({{AREACODE}}) AND D.ElementCode IN ({{ELEMENTCODE}}) AND D.ItemCode IN ('1711') AND D.ElementCode = E.ElementCode AND D.Year >= {{FROMYEAR}} AND D.YEAR <= {{TOYEAR}} AND D.Value > 0 GROUP BY E.UnitName{{LANG}} "
            }
        },

        "world_chart" : {
            "sql" : {
                "query" : " SELECT A.AreaName{{LANG}}, {{AGGREGATION}}(D.Value), E.ElementName{{LANG}}, E.UnitName{{LANG}} FROM Data D, Element E, Area A WHERE D.DomainCode = {{DOMAINCODE}} AND D.AreaCode IN ({{AREACODE}}) AND D.ElementCode IN ({{ELEMENTCODE}}) AND D.ItemCode IN ('1711') AND D.AreaCode = A.AreaCode AND D.ElementCode = E.ElementCode AND D.Year >= {{FROMYEAR}} AND D.YEAR <= {{TOYEAR}} AND D.Value > 0 GROUP BY A.AreaName{{LANG}}, E.ElementName{{LANG}}, E.UnitName{{LANG}} ORDER BY E.Order{{LANG}}"
            }
        },

        "byarea_total" : {
            "sql" : {
                "query" : " SELECT unitname, SUM(v) FROM (SELECT D.AreaCode, D.ItemCode, E.UnitName{{LANG}} AS unitname, AVG(D.value) AS v FROM Data AS D, Element E WHERE D.DomainCode = {{DOMAINCODE}} AND D.AreaCode IN ({{AREACODE}}) AND D.ElementCode IN ({{ELEMENTCODE}}) AND D.ItemCode IN ({{ITEMCODE}}) AND D.ElementCode = E.ElementCode AND D.Year >= {{FROMYEAR}} AND D.YEAR <= {{TOYEAR}} AND D.Value > 0 GROUP BY  D.AreaCode, D.ItemCode, E.UnitName{{LANG}} ) inner_query GROUP BY unitname "
            }
        },

        "byarea_chart" : {
            "sql" : {
                "query" : " SELECT I.ItemName{{LANG}}, {{AGGREGATION}}(D.Value), E.ElementName{{LANG}}, E.UnitName{{LANG}}, D.ItemCode FROM Data D, Element E, Item I, DomainItem DI WHERE D.ItemCode = DI.ItemCode AND DI.DomainCode = {{DOMAINCODE}} AND D.DomainCode = {{DOMAINCODE}} AND D.AreaCode IN ({{AREACODE}}) AND D.ItemCode IN ({{ITEMCODE}}) AND D.ElementCode IN ({{ELEMENTCODE}}) AND D.ItemCode = I.ItemCode AND D.ElementCode = E.ElementCode AND D.Year >= {{FROMYEAR}} AND D.YEAR <= {{TOYEAR}} AND D.Value > 0 GROUP BY I.ItemName{{LANG}}, E.ElementName{{LANG}}, E.UnitName{{LANG}}, D.ItemCode, DI.Order{{LANG}} ORDER BY DI.Order{{LANG}} ASC"
            }
        },

        "world_table": {
            "sql" : {
                "query" : "SELECT A.AreaName{{LANG}}, D.Year, D.Value FROM Data D, Area A WHERE D.DomainCode = 'GT' AND D.AreaCode IN ('5100', '5200', '5300', '5400', '5500') AND D.ElementCode IN ('7231') AND D.ItemCode IN ('1711') AND D.AreaCode = A.AreaCode AND D.Year >= {{FROMYEAR}} AND D.YEAR <= {{TOYEAR}} AND D.Value > 0 ORDER BY A.AreaName{{LANG}} ASC, D.Year ASC"
            }
        },

        "byarea_table": {
            "sql" : {
                "query" : " SELECT A.AreaName{{LANG}}, I.ItemName{{LANG}}, D.Year, D.Value FROM Data D, Area A, Item I, DomainItem DI WHERE D.ItemCode = DI.ItemCode AND DI.DomainCode = {{DOMAINCODE}} AND D.DomainCode = {{DOMAINCODE}} AND D.AreaCode IN ({{AREACODE}}) AND D.ItemCode IN ({{ITEMCODE}}) AND D.ElementCode IN ({{ELEMENTCODE}}) AND D.ItemCode = I.ItemCode AND A.AreaCode = D.AreaCode AND D.Year >= {{FROMYEAR}} AND D.YEAR <= {{TOYEAR}} AND D.Value > 0 ORDER BY A.AreaName{{LANG}} ASC, DI.Order{{LANG}} ASC, D.Year ASC"
            }
        },

        "query_regions" : {
            "sql" : {
                "query" : " SELECT A.AreaGroupCode AS Code, A.AreaGroupName{{LANG}} AS Name FROM DomainAreaGroupArea AS A WHERE A.DomainCode = {{DOMAINCODE}} AND A.AreaCode IN ({{AREACODE}}) AND A.AreaGroupCode NOT IN ('5000') AND A.AreaGroupCode IN ('5100', '5200', '5300', '5400', '5500') GROUP BY A.AreaGroupCode, A.AreaGroupName{{LANG}} ORDER BY A.AreaGroupName{{LANG}} ASC "
            }
        },

        "query_sub_regions" : {
            "sql" : {
                "query" : " SELECT A.AreaGroupCode AS Code, A.AreaGroupName{{LANG}} AS Name FROM DomainAreaGroupArea AS A WHERE A.DomainCode = {{DOMAINCODE}} AND A.AreaCode IN ({{AREACODE}}) AND A.AreaGroupCode NOT IN ('5000','5100', '5200', '5300', '5400', '5500') AND ( A.AreaGroupCode LIKE '51%' OR A.AreaGroupCode LIKE '52%' OR A.AreaGroupCode LIKE '53%' OR A.AreaGroupCode LIKE '54%' OR A.AreaGroupCode LIKE '55%' ) GROUP BY A.AreaGroupCode, A.AreaGroupName{{LANG}} ORDER BY A.AreaGroupName{{LANG}} ASC " }
        },

        "agriculture_total_chart" : {
            "sql" : {
                "query": "SELECT D.Year, A.AreaName{{LANG}}, D.Value, E.UnitName{{LANG}} FROM Data AS D, Element E, Area A WHERE D.DomainCode IN ({{DOMAINCODE}}) AND D.AreaCode =A.AreaCode AND D.AreaCode IN ({{AREACODE}}) AND D.ElementCode IN ('7231') AND D.ItemCode IN ('1711') AND D.ElementCode = E.ElementCode AND D.Year >= {{FROMYEAR}} AND D.Year <= {{TOYEAR}} AND D.Value > 0 GROUP BY D.Year, A.AreaName{{LANG}}, D.Value, E.UnitName{{LANG}} ORDER BY A.AreaName{{LANG}}, D.Year, E.UnitName{{LANG}}"
            }
        },

        "byitem_chart" : {
            "sql" : {
                "query": "SELECT D.Year, I.ItemName{{LANG}}, SUM(D.Value), E.UnitName{{LANG}} FROM Data AS D, Element E, Item I WHERE D.DomainCode IN ({{DOMAINCODE}}) AND D.ItemCode = I.ItemCode AND D.AreaCode IN ({{AREACODE}}) AND D.ElementCode IN ('7231') AND D.ItemCode IN ({{ITEMCODE}}) AND D.ElementCode = E.ElementCode AND D.Year >= {{FROMYEAR}} AND D.Year <= {{TOYEAR}} AND D.Value > 0 GROUP BY D.Year, I.ItemName{{LANG}}, E.UnitName{{LANG}} ORDER BY I.ItemName{{LANG}}, D.Year, E.UnitName{{LANG}}"
            }
        }

    };
});