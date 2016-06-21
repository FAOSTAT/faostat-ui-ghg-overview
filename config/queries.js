/*global define*/
define([], function () {

    'use strict';

    return {

        "country_list": {
            "sql": {
                "query": "exec Warehouse.dbo.usp_GetListSingle 'GT', '{{LANG}}', 'area'"
            }
        },

        "year_list": {
            "sql": {
                "query": "exec Warehouse.dbo.usp_GetListYearSingle 'GT', 'E', 'year'"
            }
        },

        "world_total" : {
            "sql" : {
                "query" : " SELECT U.UnitName{{LANG}}, {{AGGREGATION}}(D.Value) FROM  Warehouse_data.dbo.Data{{DOMAINCODE}} AS D, Warehouse.dbo.DomainVarUnit U WHERE D.Var1Code IN ({{AREACODE}}) AND D.Var3Code IN ({{ELEMENTCODE}}) AND D.Var2Code IN ('1711') AND D.Var3Code = U.VarCode AND D.Var4Code >= {{FROMYEAR}} AND D.Var4Code <= {{TOYEAR}} AND D.Value > 0 AND U.DomainCode = '{{DOMAINCODE}}' AND U.VarType = 'element' GROUP BY U.UnitName{{LANG}} "
            }
        },

        "world_chart" : {
            "sql" : {
                "query" : " SELECT A.VarName{{LANG}} AS AreaName{{LANG}}, {{AGGREGATION}}(D.Value), E.VarName{{LANG}} AS ElementName{{LANG}}, U.UnitName{{LANG}} FROM  Warehouse_data.dbo.Data{{DOMAINCODE}} D, Warehouse.dbo.DomainVar E, Warehouse.dbo.DomainVar A, Warehouse.dbo.DomainVarUnit U WHERE E.DomainCode = '{{DOMAINCODE}}' AND A.DomainCode = E.DomainCode AND U.DomainCode = E.DomainCode AND A.VarType = 'area' AND E.VarType = 'element' AND U.VarType = 'element' AND D.Var1Code IN ({{AREACODE}}) AND D.Var3Code IN ({{ELEMENTCODE}}) AND D.Var2Code IN ('1711') AND D.Var1Code = A.VarCode AND D.Var3Code = E.VarCode AND D.Var3Code = U.VarCode AND D.Var4Code >= {{FROMYEAR}} AND D.Var4Code <= {{TOYEAR}} AND D.Value > 0 GROUP BY A.VarName{{LANG}}, E.VarName{{LANG}}, U.UnitName{{LANG}} ORDER BY E.Var3Order{{LANG}}"
            }
        },

        "byarea_total" : {
            "sql" : {
                "query" : " SELECT unitname, SUM(v) FROM (SELECT D.Var1Code, D.Var2Code, U.UnitName{{LANG}} AS unitname, AVG(D.value) AS v FROM Warehouse_data.dbo.Data{{DOMAINCODE}} AS D, Warehouse.dbo.DomainVarUnit U WHERE U.DomainCode = '{{DOMAINCODE}}' AND D.Var1Code IN ({{AREACODE}}) AND D.Var3Code IN ({{ELEMENTCODE}}) AND D.Var2Code IN ({{ITEMCODE}}) AND D.Var3Code = U.VarCode AND U.VarType = 'element' AND D.Var4Code >= {{FROMYEAR}} AND D.Var4Code <= {{TOYEAR}} AND D.Value > 0 GROUP BY  D.Var1Code, D.Var2Code, U.UnitName{{LANG}} ) inner_query GROUP BY unitname "
            }
        },

        "byarea_chart" : {
            "sql" : {
                // "query" : " SELECT I.VarName{{LANG}} AS ItemName{{LANG}}, {{AGGREGATION}}(D.Value), E.VarName{{LANG}} AS ElementName{{LANG}}, U.UnitName{{LANG}}, D.Var2Code AS ItemCode FROM Warehouse_data.dbo.Data{{LANG}} D, Warehouse.dbo.DomainVar E, Warehouse.dbo.DomainVar I, Warehouse.dbo.DomainVarUnit U WHERE D.Var2Code = I.VarCode AND I.DomainCode = '{{DOMAINCODE}}' AND I.VarType = 'item' AND E.DomainCode = '{{DOMAINCODE}}' AND E.VarCode = D.Var3Code AND E.VarType = 'element' AND U.DomainCode = '{{DOMAINCODE}}' AND U.VarCode = E.VarCode AND U.VarType = 'element' AND D.Var1Code IN ({{AREACODE}}) AND D.Var2Code IN ({{ITEMCODE}}) AND D.Var3Code IN ({{ELEMENTCODE}}) AND D.Var4Code >= {{FROMYEAR}} AND D.Var4Code <= {{TOYEAR}} AND D.Value > 0 GROUP BY I.VarName{{LANG}}, E.VarName{{LANG}}, U.UnitName{{LANG}}, D.Var2Code, I.Var3Order{{LANG}} ORDER BY I.Var3Order{{LANG}} ASC"
                // "query" : " SELECT I.VarName{{LANG}} AS ItemName{{LANG}}, SUM(D.Value), E.VarName{{LANG}} AS ElementName{{LANG}}, U.UnitName{{LANG}}, D.Var2Code AS ItemCode FROM Warehouse_data.dbo.Data{{DOMAINCODE}} D, Warehouse.dbo.DomainVar E, Warehouse.dbo.DomainVar I, Warehouse.dbo.DomainVarUnit U WHERE D.Var2Code = I.VarCode AND I.DomainCode = '{{DOMAINCODE}}' AND I.VarType = 'item' AND E.DomainCode = '{{DOMAINCODE}}' AND E.VarCode = D.Var3Code AND E.VarType = 'element' AND U.DomainCode = '{{DOMAINCODE}}' AND U.VarCode = E.VarCode AND U.VarType = 'element' AND D.Var1Code IN ({{AREACODE}}) AND D.Var2Code IN ({{ITEMCODE}}) AND D.Var3Code IN ({{ELEMENTCODE}}) AND D.Var4Code >= {{FROMYEAR}} AND D.Var4Code <= {{TOYEAR}} AND D.Value > 0 GROUP BY I.VarName{{LANG}}, E.VarName{{LANG}}, U.UnitName{{LANG}}, D.Var2Code, I.Var3Order{{LANG}} ORDER BY I.Var3Order{{LANG}} ASC"

                "query" : " SELECT ItemName{{LANG}}, SUM(Value), ElementName{{LANG}}, UnitName{{LANG}}, ItemCode FROM (SELECT D.Var1Code, I.VarName{{LANG}} AS ItemName{{LANG}}, AVG(D.Value) AS Value, E.VarName{{LANG}} AS ElementName{{LANG}}, U.UnitName{{LANG}}, D.Var2Code AS ItemCode, I.Var3Order{{LANG}} FROM Warehouse_data.dbo.Data{{DOMAINCODE}} D, Warehouse.dbo.DomainVar E, Warehouse.dbo.DomainVar I, Warehouse.dbo.DomainVarUnit U WHERE D.Var2Code = I.VarCode AND I.DomainCode = '{{DOMAINCODE}}' AND I.VarType = 'item' AND E.DomainCode = '{{DOMAINCODE}}' AND E.VarCode = D.Var3Code AND E.VarType = 'element' AND U.DomainCode = '{{DOMAINCODE}}' AND U.VarCode = E.VarCode AND U.VarType = 'element' AND D.Var1Code IN ({{AREACODE}}) AND D.Var2Code IN ({{ITEMCODE}}) AND D.Var3Code IN ({{ELEMENTCODE}}) AND D.Var4Code >= {{FROMYEAR}} AND D.Var4Code <= {{TOYEAR}} AND D.Value > 0 GROUP BY D.Var1Code, I.VarName{{LANG}}, E.VarName{{LANG}}, U.UnitName{{LANG}}, D.Var2Code, I.Var3Order{{LANG}} ) inner_query GROUP BY ItemName{{LANG}}, ElementName{{LANG}}, UnitName{{LANG}}, ItemCode, Var3Order{{LANG}} ORDER BY Var3Order{{LANG}} ASC"

            }
        },

        "world_table": {
            "sql" : {
                "query" : "SELECT A.VarName{{LANG}} AS AreaName{{LANG}}, D.Var4Code AS Year, D.Value FROM Warehouse_Data.dbo.DataGT D, Warehouse.dbo.DomainVar A WHERE A.DomainCode = 'GT' AND A.VarType = 'area' AND D.Var1Code IN ('5100', '5200', '5300', '5400', '5500') AND D.Var3Code IN ('7231') AND D.Var2Code IN ('1711') AND D.Var1Code = A.VarCode AND D.Var4Code >= {{FROMYEAR}} AND D.Var4Code <= {{TOYEAR}} AND D.Value > 0 ORDER BY A.VarName{{LANG}} ASC, D.Var4Code ASC"
            }
        },

        "byarea_table": {
            "sql" : {
                "query" : " SELECT A.VarName{{LANG}} AS AreaName{{LANG}}, I.VarName{{LANG}} AS ItemName{{LANG}}, D.Var4Code AS Year, D.Value FROM Warehouse_data.dbo.Data{{DOMAINCODE}} D, Warehouse.dbo.DomainVar A, Warehouse.dbo.DomainVar I WHERE D.Var2Code = I.VarCode AND I.DomainCode = '{{DOMAINCODE}}' AND I.VarType = 'item' AND A.DomainCode = '{{DOMAINCODE}}' AND A.VarType = 'area' AND D.Var1Code IN ({{AREACODE}}) AND D.Var2Code IN ({{ITEMCODE}}) AND D.Var3Code IN ({{ELEMENTCODE}}) AND D.Var2Code = I.VarCode AND A.VarCode = D.Var1Code AND D.Var4Code >= {{FROMYEAR}} AND D.Var4Code <= {{TOYEAR}} AND D.Value > 0 ORDER BY A.VarName{{LANG}} ASC, I.Var3Order{{LANG}} ASC, D.Var4Code ASC"
            }
        },

        "query_regions" : {
            "sql" : {
                "query" : " SELECT A.VarGroupCode AS Code, A.VarGroupName{{LANG}} AS Name FROM Warehouse.dbo.DomainVarGroupVar AS A WHERE A.DomainCode = '{{DOMAINCODE}}' AND A.VarCode IN ({{AREACODE}}) AND A.VarGroupCode NOT IN ('5000') AND A.VarGroupCode IN ('5100', '5200', '5300', '5400', '5500') GROUP BY A.VarGroupCode, A.VarGroupName{{LANG}} ORDER BY A.VarGroupName{{LANG}} ASC "
            }
        },

        "query_sub_regions" : {
            "sql" : {
                "query" : " SELECT A.VarGroupCode AS Code, A.VarGroupName{{LANG}} AS Name FROM Warehouse.dbo.DomainVarGroupVar AS A WHERE A.DomainCode = '{{DOMAINCODE}}' AND A.VarType = 'area' AND A.VarCode IN ({{AREACODE}}) AND A.VarGroupCode NOT IN ('5000','5100', '5200', '5300', '5400', '5500') AND ( A.VarGroupCode LIKE '51%' OR A.VarGroupCode LIKE '52%' OR A.VarGroupCode LIKE '53%' OR A.VarGroupCode LIKE '54%' OR A.VarGroupCode LIKE '55%' ) GROUP BY A.VarGroupCode, A.VarGroupName{{LANG}} ORDER BY A.VarGroupName{{LANG}} ASC " }
        },

        "agriculture_total_chart" : {
            "sql" : {
                "query": "SELECT D.Var4Code AS Year, A.VarName{{LANG}} AS AreaName{{LANG}}, D.Value, U.UnitName{{LANG}} FROM Warehouse_data.dbo.Data{{DOMAINCODE}} AS D, Warehouse.dbo.DomainVarUnit U, Warehouse.dbo.DomainVar A WHERE A.DomainCode IN ('{{DOMAINCODE}}') AND A.VarType = 'area' AND D.Var1Code =A.VarCode AND D.Var1Code IN ({{AREACODE}}) AND D.Var3Code IN ('7231') AND D.Var2Code IN ('1711') AND D.Var3Code = U.VarCode AND U.DomainCode = '{{DOMAINCODE}}' AND U.VarType = 'element' AND D.Var4Code >= {{FROMYEAR}} AND D.Var4Code <= {{TOYEAR}} AND D.Value > 0 GROUP BY D.Var4Code, A.VarName{{LANG}}, D.Value, U.UnitName{{LANG}} ORDER BY A.VarName{{LANG}}, D.Var4Code, U.UnitName{{LANG}}"
            }
        },

        "byitem_chart" : {
            "sql" : {
                "query": "SELECT D.Var4Code AS Year, A.VarName{{LANG}} AS AreaName{{LANG}}, SUM(D.Value), U.UnitName{{LANG}} FROM Warehouse_data.dbo.Data{{DOMAINCODE}} AS D, Warehouse.dbo.DomainVarUnit U, Warehouse.dbo.DomainVar A WHERE A.DomainCode IN ('{{DOMAINCODE}}') AND A.VarType = 'area' AND D.Var1Code = A.VarCode AND D.Var1Code IN ({{AREACODE}}) AND U.DomainCode = A.DomainCode AND U.VarType = 'element' AND D.Var3Code IN ('7231') AND D.Var2Code IN ({{ITEMCODE}}) AND D.Var3Code = U.VarCode AND D.Var4Code >= {{FROMYEAR}} AND D.Var4Code <= {{TOYEAR}} AND D.Value > 0 GROUP BY D.Var4Code, A.VarName{{LANG}}, U.UnitName{{LANG}} ORDER BY A.VarName{{LANG}}, D.Var4Code, U.UnitName{{LANG}}"
                //"query": "SELECT D.Var4Code AS Year, I.VarName{{LANG}} AS ItemName{{LANG}}, SUM(D.Value), U.UnitName{{LANG}} FROM Warehouse_data.dbo.Data{{DOMAINCODE}} AS D, Warehouse.dbo.DomainVarUnit U, Warehouse.dbo.DomainVar I WHERE I.DomainCode IN ('{{DOMAINCODE}}') AND U.DomainCode = I.DomainCode AND I.VarType = 'item' AND u.VarType = 'element' AND D.Var2Code = I.VarCode AND D.Var1Code IN ({{AREACODE}}) AND D.Var3Code IN ('7231') AND D.Var2Code IN ({{ITEMCODE}}) AND D.Var3Code = U.VarCode AND D.Var4Code >= {{FROMYEAR}} AND D.Var4Cpde <= {{TOYEAR}} AND D.Value > 0 GROUP BY D.Var4Code, I.VarName{{LANG}}, U.UnitName{{LANG}} ORDER BY I.VarName{{LANG}}, D.Var4Code, U.UnitName{{LANG}}"
            }
        }

    };
});